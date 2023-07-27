import { useState, useEffect } from "react"
import { CalculatorFunctions } from "./helper"
import { ICalculatorProps } from "./types"
import clsx from "clsx"
import { useWindow } from "../../../contexts/WindowContext"

const Button = ({ text, onClick, ...rest }: ICalculatorProps) => {
  return (
    <button
      className={clsx(
        "flex h-10 w-10 items-center justify-center border-2 border-black bg-white text-black shadow-[6px_6px_0px_0px] shadow-black transition-all duration-100 hover:bg-black hover:text-white active:translate-y-1 active:shadow-none",
        {
          "!w-[110px]": text === "=",
        },
      )}
      onClick={() => onClick!(text)}
      {...rest}
    >
      <span className="text-3xl">{text}</span>
    </button>
  )
}

export default function Calculator() {
  const { setInitialSize } = useWindow()
  const [display, setDisplay] = useState("0")
  const { handleClick } = new CalculatorFunctions(display, setDisplay)

  const buttons = [
    ["C", "E", "<", "*"],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ]

  useEffect(() => {
    setInitialSize({
      width: 300,
      height: 460,
    })
  }, [])

  return (
    <div
      style={{
        backgroundImage: "url('/pattern/dotted/lightAlt.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "150px",
      }}
      className="flex h-full w-full flex-col items-center justify-evenly bg-white"
    >
      <div className="flex h-12 w-[80%] items-center justify-end border-[3px] border-black bg-white px-4">
        <p className="overflow-hidden text-2xl">{display.slice(0, 10)}</p>
      </div>
      <div className="flex h-[320px] w-[80%] flex-col justify-evenly">
        {buttons.map((row, index) => (
          <div key={index} className="flex items-center justify-between">
            {row.map((text, index) => (
              <Button key={index} onClick={handleClick} text={text} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
