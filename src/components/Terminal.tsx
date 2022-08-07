//@ts-ignore
import ReactTerminal from "react-console-emulator";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useApps } from "../hooks/appHook";

const Container = styled.div`
  width: 500px;
  height: 300px;

  .terminal {
    background-color: ${({ theme }) => theme.colors.white} !important;
    color: ${({ theme }) => theme.colors.black} !important;

    .text {
      color: ${({ theme }) => theme.colors.black} !important;
      font-family: "Fixedsys Excelsior", monospace !important;
    }

    .inputArea {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
    }
  }
`;

export default function Terminal() {
  const navigate = useNavigate();

  const { apps, removeApp } = useApps();
  const commands = {
    echo: {
      description: "Echo a passed string.",
      usage: "echo <string>",
      fn: (...args: string[]) => args.join(" "),
    },
    ps: {
      description: "List all processes.",
      usage: "ps",
      fn: () => apps.map((app) => `${app.title} - ${app.id}`).join("\n"),
    },
    reboot: {
      description: "Reboot the computer.",
      usage: "reboot",
      fn: () => {
        navigate("/");
      },
    },
    kill: {
      description: "Kill a process.",
      usage: "kill <process id>",
      fn: (...args: string[]) => {
        const id = args.join("");
        const app = apps.find((app) => app.id === id);
        if (app) {
          removeApp(id);
          return "Process killed";
        }
        return "Process not found";
      },
    },
  };

  return (
    <Container>
      <ReactTerminal
        className="terminal"
        commands={commands}
        promptLabel={"C>"}
        inputClassName="text"
        contentClassName="text"
        messageClassName="text"
        promptLabelClassName="text"
        inputAreaClassName="inputArea"
        style={{}}
      />
    </Container>
  );
}
