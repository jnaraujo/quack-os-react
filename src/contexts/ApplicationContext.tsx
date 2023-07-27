import { createContext, useState, ReactNode, useMemo, lazy } from "react"
import { App } from "../types/ApplicationType"

const APPLICATIONS = {
  clock: lazy(() => import("../components/Apps/Clock")),
  calculator: lazy(() => import("../components/Apps/Calculator")),
  navigator: lazy(() => import("../components/Apps/Navigator")),
  pyide: lazy(() => import("../components/Apps/PyIDE")),
  terminal: lazy(() => import("../components/Apps/Terminal")),
}

export type ApplicationName = keyof typeof APPLICATIONS

interface AddAppProps {
  name: ApplicationName
  x?: number
  y?: number
}

export interface ApplicationType {
  apps: App[]
  addApp: (props: AddAppProps) => void
  removeApp: (id: string) => void
  clearApps: () => void
}

const ApplicationContext = createContext<ApplicationType>({} as ApplicationType)

function randomFixedInteger(length: number) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1),
  )
}

const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [apps, setApps] = useState<App[]>([])

  const addApp = ({ name, x, y }: AddAppProps) => {
    const Comp = APPLICATIONS[name]

    const app: App = {
      id: randomFixedInteger(8).toString(),
      Node: Comp,
      title: name,
      start: Date.now(),
      x: x,
      y: y,
    }

    setApps([...apps, app])
  }

  const removeApp = (id: string) => {
    setApps((prev) => prev.filter((app) => app.id !== id))
  }

  const clearApps = () => {
    setApps([])
  }

  const value = useMemo(
    () => ({
      apps,
      addApp,
      removeApp,
      clearApps,
    }),
    [apps],
  )

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  )
}

export { ApplicationContext }

export default ApplicationProvider
