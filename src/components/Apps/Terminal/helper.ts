import { NavigateFunction } from "react-router-dom"
import { ApplicationType } from "../../../types/ApplicationType"
import { Commands } from "./types"

let pyodide: any

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

const commands = (
  useApps: ApplicationType,
  navigate: NavigateFunction,
): Commands => {
  const { apps, removeApp } = useApps

  return {
    echo: {
      description: "Echo a passed string.",
      usage: "echo <string>",
      fn: (...args: string[]) => args.join(" "),
    },
    python: {
      description: "Run a python code.",
      usage: "python <code>",
      fn: async (...args: string[]) => {
        if (!pyodide) {
          pyodide = await loadPy()
        }

        if (!args) {
          return "Please enter a code to run. Example: python print('Hello World')"
        }

        try {
          return pyodide.runPython(`run_code('${args.join(" ")}')`)
        } catch (error: any) {
          return error.message
        }
      },
    },
    ps: {
      description: "List all processes.",
      usage: "ps",
      fn: () => {
        let text = "------------------\n"
        text += "TITLE - ID - TIME\n"
        text += "------------------\n"

        text += apps
          .map(
            (app) =>
              `${app.title} - ${app.id} - ${(
                (Date.now() - app.start!) /
                1000
              ).toFixed(2)} sec(s)`,
          )
          .join("\n")

        return text
      },
    },
    reboot: {
      description: "Reboot the computer.",
      usage: "reboot",
      fn: () => {
        navigate(0)
        return ""
      },
    },
    kill: {
      description: "Kill a process.",
      usage: "kill <process id>",
      fn: (...args: string[]) => {
        const id = args.join("")
        const app = apps.find((app) => app.id === id)
        if (app) {
          removeApp(id)
          return "Process killed"
        }
        return "Process not found"
      },
    },
  }
}

export { commands }
