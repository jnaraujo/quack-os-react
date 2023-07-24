import React from "react"

const Navigator = React.lazy(() => import("../../components/Apps/Navigator"))
const Terminal = React.lazy(() => import("../../components/Apps/Terminal"))
const Clock = React.lazy(() => import("../../components/Apps/Clock"))
const Calculator = React.lazy(() => import("../../components/Apps/Calculator"))
const PyIDE = React.lazy(() => import("../../components/Apps/PyIDE"))

const AppsOnDesktop = [
  {
    title: "Clock",
    id: "clock",
    icon: "icons/clock/Clock_Face.svg",
    Node: Clock,
  },
  {
    title: "Terminal",
    id: "terminal",
    icon: "/icons/applications/terminal.png",
    Node: Terminal,
  },
  {
    title: "Duck's Boat Navigator",
    id: "navigator",
    icon: "/icons/applications/Brosen_windrose.svg",
    Node: Navigator,
  },
  {
    title: "Calculator",
    id: "calculator",
    icon: "/icons/applications/calculator.svg",
    Node: Calculator,
  },
  {
    title: "PyIDE",
    id: "pyide",
    icon: "/icons/applications/pyide.png",
    Node: PyIDE,
  },
]

export { AppsOnDesktop }

export function openApp(id: string) {
  const app = AppsOnDesktop.find((app) => app.id === id)
  if (app) {
    return app
  }
  return null
}
