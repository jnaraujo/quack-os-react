import { Commands } from "./types"
import { useWebContainer } from "../../../contexts/WebContainerContext"
import { useApps } from "../../../hooks/useApp"

const commands = (runCode: any): Commands => {
  const { apps, removeApp } = useApps()
  const { exec, webContainer, cd } = useWebContainer()

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
    ls: {
      description: "List all files and folders in the current directory.",
      usage: "ls",
      fn: (...args: string[]) => {
        return new Promise((resolve) => {
          exec(["ls", ...args], (result: string) => {
            if (!result) {
              return resolve("No files or folders found")
            }
            resolve(result)
          })
        })
      },
    },
    pwd: {
      description: "Show the current directory.",
      usage: "pwd",
      fn: () => {
        return new Promise((resolve) => {
          exec(["pwd"], (result: string) => {
            resolve(result)
          })
        })
      },
    },

    rm: {
      description: "Remove a file or folder.",
      usage: "rm <file or folder name>",
      fn: (...args: string[]) => {
        if (args.length === 0) {
          return "Please enter a file or folder name. Example: rm newFolder"
        }

        const isRecursive = args[0] === "-rf"

        if (isRecursive) {
          args.shift()
        }

        if (args.length === 1 && args[0] === "/") {
          return "Cannot remove root directory"
        }

        return new Promise((resolve) => {
          webContainer.fs
            .rm(args.join(" "), {
              recursive: isRecursive,
            })
            .then(() => {
              resolve("File or folder removed")
            })
            .catch(() => {
              resolve("File or folder not found")
            })
        })
      },
    },
    exec: {
      description: "Execute a command.",
      usage: "exec <command>",
      fn: (...args: string[]) => {
        if (args.length === 0) {
          return "Please enter a command. Example: exec ls"
        }

        return new Promise((resolve) => {
          exec(args, (result: string) => {
            resolve(result)
          })
        })
      },
    },
    cat: {
      description: "Show the content of a file.",
      usage: "cat <file name>",
      fn: (...args: string[]) => {
        if (args.length === 0) {
          return "Please enter a file name. Example: cat newFile"
        }

        if (args[0] === ">") {
          return webContainer.fs
            .writeFile(args[1], args.slice(2).join(" "))
            .then(() => {
              return "File created"
            })
            .catch(() => {
              return "File already exists"
            })
        }

        return new Promise((resolve) => {
          webContainer.fs
            .readFile(args.join(" "), "utf-8")
            .then((result) => {
              resolve(result)
            })
            .catch(() => {
              resolve("File not found")
            })
        })
      },
    },
    cd: {
      description: "Change directory.",
      usage: "cd <directory name>",
      fn: (...args: string[]) => {
        if (args.length === 0) {
          return "Please enter a directory name. Example: cd newFolder"
        }

        return new Promise(async (resolve) => {
          try {
            await cd(args.join(" "))
            resolve("")
          } catch (error: any) {
            resolve(error.message)
          }
        })
      },
    },
    mkdir: {
      description: "Create a new directory.",
      usage: "mkdir <directory name>",
      fn: (...args: string[]) => {
        if (args.length === 0) {
          return "Please enter a directory name. Example: mkdir newFolder"
        }

        return new Promise((resolve) => {
          webContainer.fs
            .mkdir(args.join(" "))
            .then(() => {
              resolve("Directory created")
            })
            .catch(() => {
              resolve("Directory already exists")
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
        window.location.reload()
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
