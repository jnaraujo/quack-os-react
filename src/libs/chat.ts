import * as protocol from "./protocol"

export class LetsChat {
  private socket?: WebSocket
  private account?: protocol.Account
  constructor(private addr: string) {}

  connect() {
    return new Promise((resolve) => {
      const socket = new WebSocket(this.addr)
      socket.binaryType = "arraybuffer"

      this.socket = socket
      socket.onopen = () => {
        resolve(true)
      }
    })
  }

  async ping() {
    return this.sendPacket(new protocol.PingMessage().toPacket())
  }

  async auth(username: string): Promise<protocol.Account | null> {
    await this.sendPacket(new protocol.ClientAuthMessage(username).toPacket())

    const serverAuthMsg = protocol.ServerAuthMessage.fromPacket(
      await this.readPacket(),
    )
    if (serverAuthMsg.status !== "ok") {
      console.log("failed to login")
      return null
    }

    this.account = serverAuthMsg.account
    return this.account ?? null
  }

  async sendPacket(pkt: protocol.Packet) {
    this.send(pkt.toBinary())
  }

  onMessage(cb: (msg: protocol.ChatMessage) => void) {
    if (!this.socket) {
      return
    }

    this.socket.onmessage = (ev) => {
      const pkt = protocol.Packet.fromBytes(ev.data)
      cb(protocol.ChatMessage.fromPacket(pkt))
    }
  }

  async readPacket() {
    const data = await await this.read()
    return protocol.Packet.fromBytes(data)
  }

  send(message: any) {
    this.socket?.send(message)
  }

  read(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        return reject(new Error("Socket is not initialized"))
      }

      this.socket.onmessage = (ev) => {
        resolve(ev.data)
      }

      // Se desejar, você pode também adicionar um tratamento para onerror
      this.socket.onerror = (error) => {
        reject(error)
      }
    })
  }

  close() {
    this.socket?.close()
  }
}
