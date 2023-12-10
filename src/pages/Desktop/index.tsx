import { useEffect } from "react"
import { useWindowSize } from "react-use"

// hooks
import { useApps } from "../../hooks/useApp"

// components
import AppIcon from "../../components/AppIcon"
import TopBar from "../../components/TopBar"
import Application from "../../components/Application"

// apps
import { AppsOnDesktop } from "./helper"
import WelcomeCard from "../../components/WelcomeCard"

const Desktop = () => {
  const { width } = useWindowSize()
  const { apps, addApp } = useApps()

  useEffect(() => {
    addApp({ name: "clock", x: width - 400, y: 20 })
  }, [])

  return (
    <>
      <main className="fixed h-screen w-screen overflow-hidden bg-blue-700 bg-duck bg-[length:200px_200px] bg-center bg-no-repeat">
        <TopBar />

        <div className="h-full w-full bg-dot-pattern bg-[length:50px] bg-repeat">
          {apps.map((app) => (
            <Application key={app.id} {...app} />
          ))}

          {AppsOnDesktop.map((app) => (
            <AppIcon
              key={app.id}
              isDraggable
              onDoubleClick={() => addApp({ name: app.id })}
              defaultPosition={{ x: 10, y: 10 }}
              icon={app.icon}
              title={app.title}
            />
          ))}

          <WelcomeCard />
        </div>
      </main>
    </>
  )
}

export default Desktop
