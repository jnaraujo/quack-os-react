importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js")

console.log("Python worker started")

async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide()
}

let pyodideReadyPromise = loadPyodideAndPackages()

onmessage = async function (event) {
  await pyodideReadyPromise

  const { id, code } = event.data

  try {
    await self.pyodide.loadPackagesFromImports(code)
    self.pyodide.setStdout({
      batched: (text) => {
        self.postMessage({ stdout: text, id })
      },
    })
    self.pyodide.setStderr({
      batched: (text) => {
        self.postMessage({ stdout: text, id })
      },
    })
    await self.pyodide.runPythonAsync(code)
  } catch (error) {
    self.postMessage({ stdout: error.message, id })
  }
}
