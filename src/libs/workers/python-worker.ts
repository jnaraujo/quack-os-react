import { PyodideInterface, loadPyodide } from "pyodide"

let pyodide: PyodideInterface
async function loadPyodideAndPackages() {
  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
  })
}

let pyodideReadyPromise = loadPyodideAndPackages()

onmessage = async function (event) {
  await pyodideReadyPromise

  const { id, code, cmd, interruptBuffer } = event.data

  // Set the interrupt buffer for the Python worker
  if (cmd === "setInterruptBuffer") {
    pyodide.setInterruptBuffer(interruptBuffer)
    return
  }

  try {
    pyodide.setStdout({
      batched: (text) => {
        self.postMessage({ stdout: text, id })
      },
    })
    pyodide.setStderr({
      batched: (text) => {
        self.postMessage({ stdout: text, id })
      },
    })

    pyodide.runPython(code)
  } catch (error: any) {
    self.postMessage({ stdout: error.message, id })
  }
}
