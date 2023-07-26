import { createContext, useContext, useEffect, useRef } from "react"

interface IPythonContext {
  runCode: (
    code: string,
    id: string,
    onResult: (result: string) => void,
  ) => void
  deleteCallback: (id: string) => void
}

const PythonContext = createContext({} as IPythonContext)

export const usePython = () => useContext(PythonContext)

export function PythonProvider({ children }: { children: React.ReactNode }) {
  const worker = useRef<Worker | null>(null)
  const callbacks = useRef<Record<string, (result: string) => void>>({})
  const autoUnload = useRef<NodeJS.Timeout | null>(null)

  function runCode(
    code: string,
    id: string,
    onResult?: (result: string) => void,
  ) {
    if (autoUnload.current) {
      clearTimeout(autoUnload.current)
      autoUnload.current = null
    }

    if (!worker.current) {
      console.log("Creating new worker")
      worker.current = new Worker("/python.worker.js")

      worker.current.onmessage = (e) => {
        const { id, stdout } = e.data
        if (callbacks.current[id]) {
          callbacks.current[id](stdout)
        }
      }
    }

    if (onResult) {
      callbacks.current[id] = onResult
    }

    worker.current.postMessage({ id, code })
  }

  function deleteCallback(id: string) {
    delete callbacks.current[id]

    if (!Object.keys(callbacks.current).length) {
      console.log("No callbacks left, unloading worker in 5 seconds")

      autoUnload.current = setTimeout(() => {
        if (worker.current) {
          worker.current.terminate()
          worker.current = null
        }
      }, 5000)
    }
  }

  return (
    <PythonContext.Provider value={{ runCode, deleteCallback }}>
      {children}
    </PythonContext.Provider>
  )
}
