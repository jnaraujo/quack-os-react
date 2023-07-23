import { useEffect, useState } from "react"
import { useApps } from "../hooks/useApp"
import clsx from "clsx"

const loadingChar = ["|", "/", "—", "\\"]

export default function Loading() {
  const [loadingCount, setLoadingCount] = useState(0)

  const { clearApps } = useApps()

  useEffect(() => {
    clearApps()

    const interval = setInterval(() => {
      setLoadingCount((prev) => {
        if (prev === 3) return 0
        return prev + 1
      })
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      className={clsx(
        "flex h-screen w-screen flex-col items-center justify-evenly bg-zinc-950 text-center text-white",
      )}
    >
      <div>
        <img src="/brand/duck.png" width={300} />
      </div>
      <p className="text-4xl">
        QuackOS <br />
        Beta Release
      </p>
      <span className="text-3xl">{loadingChar[loadingCount]}</span>
      <div>
        <p className="text-3xl">
          Quackright (c) Duck Comporation, 1995.
          <br />
          All Rights Reserved. QuackOS is a registered trademark of Quack Corp.
        </p>
      </div>
    </div>
  )
}
