import ReactTerminal from "react-console-emulator"
import { useNavigate } from "react-router-dom"
import { useApps } from "../../../hooks/useApp"
import { commands } from "./helper"
import { Container } from "./styles"

export default function Terminal() {
  const navigate = useNavigate()
  const apps = useApps()

  return (
    <Container>
      <ReactTerminal
        className="terminal"
        commands={commands(apps, navigate)}
        promptLabel={"user@duckos:~$"}
        inputClassName="text"
        contentClassName="content"
        messageClassName="text"
        promptLabelClassName="text"
        inputAreaClassName="inputArea"
        style={{}}
      />
    </Container>
  )
}
