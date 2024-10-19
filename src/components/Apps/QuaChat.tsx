import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Account, ChatMessage, LetsChat } from "../../libs/chat"

export default function Chat() {
  const anchorRef = useRef<HTMLDivElement>(null)
  const chat = useRef<LetsChat | null>(null)
  const account = useRef<Account | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    if (chat.current != null) return

    async function connect() {
      chat.current = new LetsChat("wss://chat.jnaraujo.com/ws")
      await chat.current.connect()
      account.current = await chat.current.auth("Quack")

      chat.current.onMessage((msg) => {
        setMessages((prev) => [...prev, msg])
        // anchorRef.current?.scrollIntoView()
      })
    }
    connect()

    const sendPingInterval = setInterval(() => {
      chat.current?.ping()
    }, 30_000)

    return () => {
      chat.current?.close()
      chat.current = null
      clearInterval(sendPingInterval)
    }
  }, [])

  async function handleSendMessage(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    if (!chat.current) return
    if (!account.current) return

    const content = (ev.currentTarget.elements as any).content.value as string
    ;(ev.currentTarget.elements as any).content.value = ""

    await chat.current.sendMessage({
      id: "",
      is_command: false,
      is_server: false,
      room: {
        id: "ALL",
        name: "",
      },
      content: content,
      created_at: new Date(Date.now()),
      author: account.current,
    })
  }

  return (
    <div className="flex flex-1 flex-col justify-between antialiased">
      <div className="flex-1 overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id}>
            [
            {m.created_at.toLocaleString("en-us", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
            ] [{m.room.name}] {"<"}
            {m.id.slice(0, 6)}
            {">"} {m.author?.username}: {m.content}{" "}
          </div>
        ))}
        <div ref={anchorRef} />
      </div>

      <form className="flex gap-1" onSubmit={handleSendMessage}>
        <input name="content" className="flex-1 border border-black" />
        <button
          style={{
            backgroundImage: "url('icons/arrows/arrow/left.svg')",
          }}
          className="mr-1 h-6 w-6 -scale-x-100 bg-contain bg-center bg-no-repeat active:shadow-[inset_-1px_-1px_6px_0px_rgba(0,0,0,0.4)]"
        />
      </form>
    </div>
  )
}
