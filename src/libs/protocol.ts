export enum PacketProtocolVersion {
  ProtocolVersion = 1,
}

export enum PacketType {
  PacketTypeAuth,
  PacketTypeMessage,
  PacketTypePing,
  PacketTypePong,
}

export class PacketHeader {
  version: PacketProtocolVersion
  packetType: PacketType
  length: number

  constructor(
    version: PacketProtocolVersion,
    packetType: PacketType,
    length: number,
  ) {
    this.version = version
    this.packetType = packetType
    this.length = length
  }
}

export class Packet {
  header: PacketHeader
  payload: Uint8Array

  constructor(header: PacketHeader, payload: Uint8Array) {
    this.header = header
    this.payload = payload
  }

  static newPacket(packetType: PacketType, payload: Uint8Array): Packet {
    return new Packet(
      new PacketHeader(
        PacketProtocolVersion.ProtocolVersion,
        packetType,
        payload.length,
      ),
      payload,
    )
  }

  static fromBytes(data: ArrayBuffer): Packet {
    const view = new DataView(data)
    let offset = 0

    const version = view.getUint8(offset)
    offset += 1

    const packetType = view.getUint8(offset)
    offset += 1

    const length = view.getUint16(offset, false) // Big Endian
    offset += 2

    const payload = new Uint8Array(data, offset, length)

    const header = new PacketHeader(
      version as PacketProtocolVersion,
      packetType as PacketType,
      length,
    )
    return new Packet(header, payload)
  }

  toBinary(): ArrayBuffer {
    const buffer = new ArrayBuffer(4 + this.payload.length)
    const view = new DataView(buffer)
    let offset = 0

    view.setUint8(offset, this.header.version)
    offset += 1

    view.setUint8(offset, this.header.packetType)
    offset += 1

    view.setUint16(offset, this.header.length, false) // Big Endian
    offset += 2

    new Uint8Array(buffer, offset, this.payload.length).set(this.payload)

    return buffer
  }
}

export class ChatRoom {
  id: string
  name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}

export class ChatMessage {
  id: string
  is_server: boolean
  room: ChatRoom
  author: Account | null
  content: string
  created_at: Date
  is_command: boolean

  constructor(
    author: Account | null,
    content: string,
    room: ChatRoom,
    created_at: Date,
  ) {
    this.id = this.generateId()
    this.author = author
    this.content = content
    this.created_at = created_at
    this.room = room
    this.is_command = false
    this.is_server = false
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) // Simulating an ID generator
  }

  static newServerMessage(
    content: string,
    room: ChatRoom,
    created_at: Date,
  ): ChatMessage {
    const msg = new ChatMessage(
      {
        id: "SERVER",
        username: "SERVER",
      },
      content,
      room,
      created_at,
    )
    msg.is_server = true
    return msg
  }

  static newCommandMessage(content: string, created_at: Date): ChatMessage {
    const room = new ChatRoom("COMMAND_RESPONSE", "Command Response")
    const msg = new ChatMessage(
      {
        id: "COMMAND",
        username: "COMMAND",
      },
      content,
      room,
      created_at,
    )
    msg.is_command = true
    return msg
  }

  static fromPacket(pkt: Packet): ChatMessage {
    const jsonString = new TextDecoder().decode(pkt.payload)
    const obj = JSON.parse(jsonString)
    return new ChatMessage(
      obj.author,
      obj.content,
      new ChatRoom(obj.room.id, obj.room.name),
      new Date(obj.created_at),
    )
  }

  toPacket(): Packet {
    const payload = new TextEncoder().encode(JSON.stringify(this))
    return Packet.newPacket(PacketType.PacketTypeMessage, payload)
  }
}

export class ClientAuthMessage {
  username: string
  roomId: string | undefined

  constructor(username: string, roomId?: string) {
    this.username = username
    this.roomId = roomId
  }

  static fromPacket(pkt: Packet): ClientAuthMessage {
    const jsonString = new TextDecoder().decode(pkt.payload)
    const obj = JSON.parse(jsonString)
    return new ClientAuthMessage(obj.username, obj.roomId)
  }

  toPacket(): Packet {
    const payload = new TextEncoder().encode(JSON.stringify(this))
    return Packet.newPacket(PacketType.PacketTypeAuth, payload)
  }
}

export interface Account {
  id: string
  username: string
}

export class ServerAuthMessage {
  status: string
  content: string
  roomId: string | undefined
  account: Account | undefined

  constructor(
    status: string,
    content: string,
    roomId?: string,
    account?: { id: string; username: string },
  ) {
    this.status = status
    this.content = content
    this.roomId = roomId
    this.account = account
  }

  static fromPacket(pkt: Packet): ServerAuthMessage {
    const jsonString = new TextDecoder().decode(pkt.payload)
    const obj = JSON.parse(jsonString)
    return new ServerAuthMessage(
      obj.status,
      obj.content,
      obj.roomId,
      obj.account,
    )
  }

  toPacket(): Packet {
    const payload = new TextEncoder().encode(JSON.stringify(this))
    return Packet.newPacket(PacketType.PacketTypeAuth, payload)
  }
}

export class PingMessage {
  constructor() {}

  static fromPacket(_: Packet): PingMessage {
    return new PingMessage()
  }

  toPacket(): Packet {
    const payload = new TextEncoder().encode(JSON.stringify(this))
    return Packet.newPacket(PacketType.PacketTypePing, payload)
  }
}
