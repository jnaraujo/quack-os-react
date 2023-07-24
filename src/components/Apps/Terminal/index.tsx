import ReactTerminal from "react-console-emulator"
import { useNavigate } from "react-router-dom"
import { useApps } from "../../../hooks/useApp"
import { commands } from "./helper"
import styles from "./terminal.module.css"
import { usePython } from "../../../hooks/usePython"

export default function Terminal() {
  const navigate = useNavigate()
  const apps = useApps()
  const { runCode } = usePython()

  return (
    <div className="h-[300px] w-[500px] antialiased">
      <ReactTerminal
        className={styles.terminal}
        commands={commands(apps, navigate, runCode)}
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
