import { useRef } from "react"

async function loadPy() {
  const { loadPyodide } = await import("pyodide")

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

  const py = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
  })

  py.runPython(setup_code)

  return py
}

export function usePython() {
  const pyodide = useRef<any>(null)

  async function runCode(code: string) {
    if (!pyodide.current) {
      pyodide.current = await loadPy()
    }

    const result: string = pyodide.current.runPython(`run_code('''${code}''')`)
    return result.trim()
  }

  return { runCode }
}
