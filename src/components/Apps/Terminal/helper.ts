import { NavigateFunction } from "react-router-dom"
import { Commands } from "./types"
import { ApplicationType } from "../../../contexts/ApplicationContext"

const commands = (
  useApps: ApplicationType,
  navigate: NavigateFunction,
  runCode: any,
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
      fn: (...args: string[]) => {
        return new Promise((resolve) => {
          if (args.length === 0) {
            return "Please enter a code to run. Example: python print('Hello World')"
          }

          runCode(args.join(" "), (result: string) => {
            resolve(result)
          })
        })
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
