import { useState, useEffect } from "react"
import { useWindow } from "../../contexts/WindowContext"

function Navigator() {
  const { setInitialSize, setIsResizable } = useWindow()
  const [url, setUrl] = useState(window.location.href)

  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    setInitialSize({
      width: 600,
      height: 450,
    })
    setIsResizable(true)
  }, [])

  const backHistory = () => {
    const newHistory = [...history]
    newHistory.pop()
    setHistory(newHistory)
    setUrl(newHistory[newHistory.length - 1])
  }

  const addHistory = (url: string) => {
    if (!url) {
      setHistory([])
      return
    }
    if (history.at(-1) === url) return

    const newHistory = [...history]

    if (url.startsWith("http://") || url.startsWith("https://")) {
      newHistory.push(url)
    } else {
      newHistory.push(`https://${url}`)
    }
    setHistory(newHistory)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const url = e.currentTarget.value
      addHistory(url)
    }
  }

  const page = history[0]

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-6">
        <button
          onClick={backHistory}
          style={{
            backgroundImage: "url('icons/arrows/arrow/left.svg')",
          }}
          className="h-6 w-6 bg-contain bg-center bg-no-repeat active:shadow-[inset_-1px_-1px_6px_0px_rgba(0,0,0,0.4)]"
        />
        <input
          type={"url"}
          value={url}
          onChange={(e: any) => setUrl(e.currentTarget.value)}
          onKeyDown={onKeyDown}
          className="flex-1 border border-black"
        />
      </div>
      {page ? (
        <iframe
          className="h-full"
          sandbox="allow-same-origin allow-scripts"
          src={history.at(-1)}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <img
            src="/brand/duck.png"
            width={200}
            height={200}
            alt="quack os logo"
          />
          <h2>Quack!</h2>
        </div>
      )}
    </div>
  )
}

export default Navigator
