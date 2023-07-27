import { useEffect, useState } from "react"
import { useWindow } from "../../contexts/WindowContext"

export default function Clock() {
  const { setInitialSize } = useWindow()
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
    setInitialSize({
      width: cardWidth + 30,
      height: cardHeight + 80,
    })
    updateClock()
    const interval = setInterval(updateClock, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      style={{
        width: cardWidth,
        height: cardHeight,
      }}
      className="flex items-center justify-center p-2"
    >
      <div className="flex h-full w-full items-center justify-center border-[6px] border-black">
        <strong className="text-3xl">{`${time.hours} : ${time.minutes} : ${time.seconds}`}</strong>
      </div>
    </div>
  )
}
