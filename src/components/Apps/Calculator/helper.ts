import { Dispatch, SetStateAction } from "react"

class CalculatorFunctions {
  constructor(
    private display: string,
    private setDisplay: Dispatch<SetStateAction<string>>,
  ) {}

  handleNumber = (number: string) => {
    if (this.display.length > 10) return

    if (this.display === "0" || this.display === "Error") {
      this.setDisplay(number)
    } else {
      this.setDisplay(this.display + number)
    }
  }

  handleClick = (value: string) => {
    if (this.isNumeric(value) || "*/-+".includes(value)) {
      return this.handleNumber(value)
    }
    if (value == ".") {
      if (this.display.endsWith(".")) return
      return this.handleNumber(value)
    }
    if (value === "C") {
      return this.setDisplay("0")
    }
    if (value === "=") {
      let result = ""
      try {
        const resultOfEval: number = eval(this.display)
        result = resultOfEval.toFixed(3).toString()
      } catch (error) {
        result = "Error"
      }
      return this.setDisplay(result)
    }
    if (value == "<") {
      return this.setDisplay(this.display.slice(0, -1))
    }
  }

  isNumeric = (value: string) => {
    return /^-?\d+$/.test(value)
  }
}

export { CalculatorFunctions }
