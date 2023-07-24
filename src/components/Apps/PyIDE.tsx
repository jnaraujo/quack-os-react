import { usePython } from "../../hooks/usePython"
import Button from "../ui/Button"
import { useState } from "react"

export default function PyIDE() {
  const { runCode } = usePython()
  const [output, setOutput] = useState("")
  const [code, setCode] = useState(`import math

print("Hello, world!")
print("Square root of 2 is", math.sqrt(2))`)

  async function handleRun() {
    setOutput("Running...")

    const input = code.trim()
    let result = ""
    try {
      result = await runCode(input)
    } catch (error: any) {
      result = error.message
    }
    setOutput(result)
  }

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCode(e.target.value)
  }

  return (
    <div className="flex h-[380px] w-[500px] flex-col">
      <div className="flex h-6 items-center bg-gray-300">
        <Button onClick={handleRun} className="h-full">
          Run
        </Button>
      </div>
      <textarea
        className="w-full flex-1 resize-none bg-gray-200 p-2 text-sm"
        onChange={handleOnChange}
        defaultValue={code}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      <div className="h-24 w-full overflow-auto bg-gray-300 p-2 text-sm">
        {output.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  )
}
