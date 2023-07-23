import { useEffect, useState } from "react"
import Card from "../Card"
import Title from "../../Text"
import { Content } from "./styles"

export default function Clock() {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  })

  const cardWidth = 350
  const cardHeight = 150

  const updateClock = () => {
    const date = new Date()
    setTime({
      hours: String(date.getHours()).padStart(2, "0"),
      minutes: String(date.getMinutes()).padStart(2, "0"),
      seconds: String(date.getSeconds()).padStart(2, "0"),
    })
  }

  useEffect(() => {
    updateClock()
    const interval = setInterval(updateClock, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Card width={cardWidth} height={cardHeight}>
      <Content>
        <Title className="clock">{`${time.hours} : ${time.minutes} : ${time.seconds}`}</Title>
      </Content>
    </Card>
  )
}
