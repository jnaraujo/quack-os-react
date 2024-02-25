import ReactTerminal from "react-console-emulator"
import { commands } from "./helper"
import styles from "./terminal.module.css"
import { useEffect } from "react"
import { useWindow } from "../../../contexts/WindowContext"
import { usePython } from "../../../hooks/usePython"

export default function Terminal() {
  const { setInitialSize, setIsResizable } = useWindow()
  const { runCode } = usePython()

  const commandList = commands(runPython)

  function runPython(code: string, cb: (result: string) => void) {
    runCode(code, cb)
  }

  useEffect(() => {
    setInitialSize({
      width: 550,
      height: 380,
    })
    setIsResizable(true)
  }, [])

  return (
    <div className="h-full w-full antialiased">
      <ReactTerminal
        className={styles.terminal}
        commands={commandList}
        promptLabel={"user@duckos:~$"}
        inputClassName={styles.input}
        contentClassName={styles.content}
        messageClassName={styles.message}
        promptLabelClassName={styles.promptLabel}
        inputAreaClassName={styles.inputArea}
      />
    </div>
  )
}
