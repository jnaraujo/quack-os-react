export interface Account {
  id: string
  username: string
}

export interface CharRoom {
  id: string
  name: string
}

export interface ChatMessage {
  id: string
  is_server: boolean
  room: CharRoom
  author?: Account
  content: string
  created_at: Date
  is_command: boolean
}

export class LetsChat {
  private socket?: WebSocket
  private account?: Account
  constructor(private addr: string) {}

  connect() {
    return new Promise((resolve) => {
      const socket = new WebSocket(this.addr)
      this.socket = socket
      socket.onopen = () => {
        resolve(true)
      }
    })
  }

  async ping() {
    return this.sendMessage({
      id: "",
      content: "client-ping",
      created_at: new Date(Date.now()),
      is_command: true,
      is_server: false,
      room: {
        id: "",
        name: "",
      },
      author: this.account,
    })
  }

  async auth(username: string): Promise<Account | null> {
    this.socket?.send(
      JSON.stringify({
        username,
      }),
    )

    const serverAuthMsg = JSON.parse(await this.read())
    if (serverAuthMsg.status !== "ok") {
      console.log("failed to login")
      return null
    }

    this.account = JSON.parse(await this.read()) as Account
    return this.account
  }

  async sendMessage(msg: ChatMessage) {
    this.send(JSON.stringify(msg))
  }

  onMessage(cb: (msg: ChatMessage) => void) {
    if (!this.socket) {
      return
    }

    this.socket.onmessage = (ev) => {
      let m = JSON.parse(ev.data) as ChatMessage
      m.created_at = new Date(m.created_at)
      cb(m)
    }
  }

  async readMessage() {
    return JSON.parse(await this.read()) as ChatMessage
  }

  send(message: string) {
    this.socket?.send(message)
  }

  read(): Promise<string> {
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
