import { useState } from "react"
import { useWindowSize } from "react-use"
import Card from "./Apps/Card"

function WelcomeCard() {
  const { width, height } = useWindowSize()
  const [isOpen, setIsOpen] = useState(true)

  const cardWidth = 400
  const cardHeight = 300

  const handleClose = () => setIsOpen(false)

  return (
    <Card
      defaultPosition={{
        x: width / 2 - cardWidth / 2,
        y: height / 2 - cardHeight / 2,
      }}
      width={cardWidth}
      height={cardHeight}
      isDraggable
      className="welcomeCard"
      style={{
        display: isOpen ? "inherit" : "none",
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
        <h1>Welcome to QuackOS!</h1>
        <p>
          This is a simple (and fake) operating system made with ReactJS and
          Vite.
        </p>
        <p>I hope you enjoy it!</p>
        <button className="button" onClick={handleClose}>
          I will do it!
        </button>
      </div>
    </Card>
  )
}

export default WelcomeCard
