import { useEffect, useState } from "react"
import { useApps } from "../../hooks/useApp"

import { Container } from "./styles"

const loadingChar = ["|", "/", "—", "\\"]

export default function Loading() {
  const [startedUp, setStartedUp] = useState(false)
  const [loadingCount, setLoadingCount] = useState(0)

  const { clearApps } = useApps()

  useEffect(() => {
    clearApps()

    setTimeout(() => {
      setStartedUp(true)
    }, 500)
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
    <Container className={`${startedUp === false ? "startedUp" : ""}`}>
      <div className="brand">
        <img src="/brand/duck.png" width={300} />
      </div>
      <div>
        <h2>QuackOS</h2>
        <h2>Beta Release</h2>
      </div>
      <div>
        <h2>{loadingChar[loadingCount]}</h2>
      </div>
      <div>
        <h2>Quackright (c) Duck Comporation, 1995. All Rights Reserved.</h2>
        <h2>QuackOS is a registered trademark of Quack Corp.</h2>
      </div>
    </Container>
  )
}
