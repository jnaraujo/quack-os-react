import ReactTerminal from "react-console-emulator"
import { useNavigate } from "react-router-dom"
import { useApps } from "../../../hooks/useApp"
import { commands } from "./helper"
import styles from "./terminal.module.css"
import { usePython } from "../../../contexts/PythonContext"
import { useEffect, useId } from "react"

export default function Terminal() {
  const navigate = useNavigate()
  const apps = useApps()
  const { runCode, deleteCallback } = usePython()
  const python_id = "terminal-" + useId()

  function runPython(code: string, cb: (result: string) => void) {
    runCode(code, python_id, cb)
  }

  useEffect(() => {
    return () => {
      deleteCallback(python_id)
    }
  }, [])

  return (
    <div className="h-[300px] w-[500px] antialiased">
      <ReactTerminal
        className={styles.terminal}
        commands={commands(apps, navigate, runPython)}
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
