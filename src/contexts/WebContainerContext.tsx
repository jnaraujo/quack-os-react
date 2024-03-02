import type { WebContainer } from "@webcontainer/api"
import { createContext, useContext, useEffect, useState } from "react"

interface WebContainerContextProps {
  exec(cmd: string[], output: (chunk: string) => void): Promise<void>
  webContainer: WebContainer
  cd(path: string): void
}

const WebContainerContext = createContext({} as WebContainerContextProps)

export const useWebContainer = () => useContext(WebContainerContext)

export const WebContainerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [webContainer, setWebContainer] = useState<WebContainer>()
  const [path, setPath] = useState<string>("/home/quackos")
  const [loading, setLoading] = useState<boolean>(false)

  function cd(to: string) {
    return new Promise<void>((resolve, reject) => {
      let newPath = ""

      if (to.startsWith("/")) {
        newPath = to
      } else {
        newPath = `${path}/${to}`
      }

      webContainer?.spawn("jsh", ["-c", `cd ${newPath}`]).then((process) => {
        process.exit.then((exitCode) => {
          if (exitCode !== 0) {
            reject(new Error(`cd: ${to}: No such file or directory`))
          } else {
            setPath(newPath)
            resolve()
          }
        })
      })
    })
  }

  async function exec(cmd: string[], output: (chunk: string) => void) {
    if (!webContainer || loading) {
      load()
      return output("Loading web container...")
    }

    const process = await webContainer.spawn("jsh", [
      "-c",
      `cd ${path}; ${cmd.join(" ")}`,
    ])

    const installExitCode = await process.exit

    if (installExitCode !== 0) {
      return process.output.pipeTo(
        new WritableStream({
          write(chunk) {
            output("Error: " + chunk)
            process.kill()
          },
        }),
      )
    }

    process.output.pipeTo(
      new WritableStream({
        write(chunk) {
          output(chunk)
          process.kill()
        },
      }),
    )
  }

  async function load() {
    if (webContainer || loading) {
      console.log("Web container already loaded")
      return
    }
    setLoading(true)
    console.log("Loading web container...")

    const WebContainer = await import("@webcontainer/api").then(
      (m) => m.WebContainer,
    )

    const container = await WebContainer.boot({
      workdirName: "quackos",
    })
    setWebContainer(container)
    setLoading(false)
  }

  useEffect(() => {
    return () => {
      webContainer?.teardown()
    }
  }, [])

  return (
    <WebContainerContext.Provider
      value={{ exec, webContainer: webContainer!, cd }}
    >
      {children}
    </WebContainerContext.Provider>
  )
}
