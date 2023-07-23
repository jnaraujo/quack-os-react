import { useState } from "react"
import { CalculatorFunctions } from "./helper"
import { Container } from "./styles"
import { ICalculatorProps } from "./types"

const Button = ({ text, onClick, ...rest }: ICalculatorProps) => {
  return (
    <button onClick={() => onClick!(text)} {...rest}>
      {text}
    </button>
  )
}

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const { handleClick } = new CalculatorFunctions(display, setDisplay)

  return (
    <Container>
      <div className="display">
        <p>{display}</p>
      </div>
      <div className="buttons">
        <div className="row">
          <Button onClick={handleClick} text="C" />
          <Button onClick={handleClick} text="E" />
          <Button onClick={handleClick} text="<" />
          <Button onClick={handleClick} text="*" />
        </div>
        <div className="row">
          <Button onClick={handleClick} text="7" />
          <Button onClick={handleClick} text="8" />
          <Button onClick={handleClick} text="9" />
          <Button onClick={handleClick} text="/" />
        </div>
        <div className="row">
          <Button onClick={handleClick} text="4" />
          <Button onClick={handleClick} text="5" />
          <Button onClick={handleClick} text="6" />
          <Button onClick={handleClick} text="-" />
        </div>
        <div className="row">
          <Button onClick={handleClick} text="1" />
          <Button onClick={handleClick} text="2" />
          <Button onClick={handleClick} text="3" />
          <Button onClick={handleClick} text="+" />
        </div>
        <div className="row">
          <Button onClick={handleClick} text="0" />
          <Button onClick={handleClick} text="." />
          <Button onClick={handleClick} className="max" text="=" />
        </div>
      </div>
    </Container>
  )
}
