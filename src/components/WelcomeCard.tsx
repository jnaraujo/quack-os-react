import clsx from "clsx"
import { useState } from "react"
import { useWindowSize } from "react-use"
function WelcomeCard() {
  const { width, height } = useWindowSize()
  const [isOpen, setIsOpen] = useState(true)

  const cardWidth = 400
  const cardHeight = 300

  const handleClose = () => setIsOpen(false)

  return (
    <div
      className={clsx("absolute border-2 border-black bg-white p-1")}
      style={{
        display: isOpen ? "inherit" : "none",
        top: `${height / 2 - cardHeight / 2}px`,
        left: `${width / 2 - cardWidth / 2}px`,
        width: cardWidth,
        height: cardHeight,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-[5px] border-black text-center">
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
    </div>
  )
}

export default WelcomeCard
