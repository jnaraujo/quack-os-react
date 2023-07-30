import ReactTerminal from "react-console-emulator"
import { commands } from "./helper"
import styles from "./terminal.module.css"
import { usePython } from "../../../contexts/PythonContext"
import { useEffect, useId } from "react"
import { useWindow } from "../../../contexts/WindowContext"

export default function Terminal() {
  const { setInitialSize, setIsResizable } = useWindow()
  const { runCode, deleteCallback } = usePython()
  const python_id = "terminal-" + useId()

  const commandList = commands(runPython)

  function runPython(code: string, cb: (result: string) => void) {
    runCode(code, python_id, cb)
  }

  useEffect(() => {
    setInitialSize({
      width: 550,
      height: 380,
    })
    setIsResizable(true)

    return () => {
      deleteCallback(python_id)
    }
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
