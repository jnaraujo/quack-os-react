import { useEffect, useRef } from "react"
import PythonWorker from "../libs/workers/python-worker?worker"

export function usePython() {
  const worker = useRef<Worker | null>(null)
  const interruptBuffer = useRef(new Uint8Array(new SharedArrayBuffer(1)))

  useEffect(() => {
    worker.current = new PythonWorker()
    worker.current.postMessage({
      cmd: "setInterruptBuffer",
      interruptBuffer: interruptBuffer.current,
    })

    return () => {
      console.log("Terminating worker")
      worker.current?.terminate()
    }
  }, [])

  function interruptExecution() {
    interruptBuffer.current[0] = 2
  }

  function runCode(code: string, cb: (output: string) => void) {
    interruptExecution() // Stop execution if it's running
    interruptBuffer.current[0] = 0 // Reset the interrupt buffer

    worker.current?.postMessage({ code })
    worker.current?.addEventListener("message", (e) => {
      const { stdout } = e.data

      cb(stdout)
    })
  }

  return {
    runCode,
  }
}
