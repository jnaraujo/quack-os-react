import Button from "../ui/Button"
import { useEffect, useState, lazy, Suspense } from "react"
import { useWindow } from "../../contexts/WindowContext"
import { usePyIDEStore } from "../../stores/pyIDEStore"
import { usePython } from "../../hooks/usePython"
const CodeEditor = lazy(() => import("@uiw/react-textarea-code-editor"))

export default function PyIDE() {
  const { setIsResizable, setInitialSize } = useWindow()
  const { runCode } = usePython()
  const [output, setOutput] = useState("")
  const { code, setCode } = usePyIDEStore()

  async function handleRun() {
    setOutput("Running...")

    const input = code.trim()

    let result = ""

    runCode(input, (output) => {
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
        <Suspense>
          <CodeEditor
            className="!min-h-full !overflow-hidden !bg-gray-200 !text-sm"
            onChange={handleOnChange}
            data-color-mode="light"
            language="python"
            value={code}
          />
        </Suspense>
      </div>
      <div className="h-[25%] w-full overflow-auto bg-gray-300 p-2 text-sm">
        {output.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  )
}
