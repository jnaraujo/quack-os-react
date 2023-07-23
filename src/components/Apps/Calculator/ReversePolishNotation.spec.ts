import { describe, it, expect } from "vitest"
import { ReversePolishNotation } from "./ReversePolishNotation"

describe("Reverse Polish Notation", () => {
  it("sum 1 + 1", () => {
    expect(ReversePolishNotation.calculate("1 1 +")).toBe(2)
  })
})
