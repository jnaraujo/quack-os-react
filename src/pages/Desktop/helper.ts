import { ApplicationName } from "../../contexts/ApplicationContext"

const AppsOnDesktop: {
  title: string
  id: ApplicationName
  icon: string
}[] = [
  {
    title: "Clock",
    id: "clock",
    icon: "icons/clock/Clock_Face.svg",
  },
  {
    title: "Terminal",
    id: "terminal",
    icon: "/icons/applications/terminal.png",
  },
  {
    title: "Duck's Boat Navigator",
    id: "navigator",
    icon: "/icons/applications/Brosen_windrose.svg",
  },
  {
    title: "Calculator",
    id: "calculator",
    icon: "/icons/applications/calculator.svg",
  },
  {
    title: "PyIDE",
    id: "pyide",
    icon: "/icons/applications/pyide.png",
  },
]

export { AppsOnDesktop }
