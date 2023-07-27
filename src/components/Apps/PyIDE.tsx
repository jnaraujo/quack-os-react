import { usePython } from "../../contexts/PythonContext"
import Button from "../ui/Button"
import { useEffect, useId, useState } from "react"
import CodeEditor from "@uiw/react-textarea-code-editor"
import { useWindow } from "../../contexts/WindowContext"

export default function PyIDE() {
  const { setIsResizable, setInitialSize } = useWindow()
  const { runCode, deleteCallback } = usePython()
  const [output, setOutput] = useState("")
  const [code, setCode] = useState(`import math

print("Hello, world!")
print("Square root of 2 is", math.sqrt(2))`)
  const python_id = "pyide-" + useId()

  async function handleRun() {
    setOutput("Running...")

    const input = code.trim()

    let result = ""
    runCode(input, python_id, (output) => {
      result += output + "\n"
      setOutput(result)
    })
  }

  useEffect(() => {
    setIsResizable(true)
    setInitialSize({
      width: 550,
      height: 380,
    })
    return () => {
      deleteCallback(python_id)
    }
  }, [])

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCode(e.target.value)
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-6 items-center bg-gray-300">
        <Button onClick={handleRun} className="h-full">
          Run
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        <CodeEditor
          className="!min-h-full !overflow-hidden !bg-gray-200 !text-sm"
          onChange={handleOnChange}
          data-color-mode="light"
          language="python"
          value={code}
        />
      </div>
      <div className="h-[25%] w-full overflow-auto bg-gray-300 p-2 text-sm">
        {output.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  )
}
