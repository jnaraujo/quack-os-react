import { createContext, useContext, useRef } from "react"

interface IPythonContext {
  runCode: (code: string) => Promise<string>
}

const PythonContext = createContext({} as IPythonContext)

export const usePython = () => useContext(PythonContext)

export function PythonProvider({ children }: { children: React.ReactNode }) {
  const pyodide = useRef<any>(null)

  async function loadPyodide() {
    if (pyodide.current) {
      return
    }
    const { loadPyodide } = await import("pyodide")

    const py = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
    })

    return py
  }

  async function runCode(code: string) {
    if (!pyodide.current) {
      pyodide.current = await loadPyodide()
    }

    const setup_code = `
    import sys, io, traceback
    namespace = {}  # use separate namespace to hide run_code, modules, etc.
    def run_code(code):
      """run specified code and return stdout and stderr"""
      out = io.StringIO()
      oldout = sys.stdout
      olderr = sys.stderr
      sys.stdout = sys.stderr = out
      try:
          # change next line to exec(code, {}) if you want to clear vars each time
          exec(code, namespace)
      except:
          traceback.print_exc()
    
      sys.stdout = oldout
      sys.stderr = olderr
      return out.getvalue()
    `

    pyodide.current.runPython(setup_code)
    const result: string = pyodide.current.runPython(`run_code('''${code}''')`)

    return result.trim()
  }

  return (
    <PythonContext.Provider value={{ runCode }}>
      {children}
    </PythonContext.Provider>
  )
}
