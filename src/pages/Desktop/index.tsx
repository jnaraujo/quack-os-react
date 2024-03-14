import { useEffect, useMemo } from "react"
import { useWindowSize } from "react-use"
import { useApps } from "../../hooks/useApp"
import AppIcon from "../../components/AppIcon"
import TopBar from "../../components/TopBar"
import Application from "../../components/Application"
import WelcomeCard from "../../components/WelcomeCard"
import { useIconsStore } from "../../stores/iconsStore"

const Desktop = () => {
  const desktopIcons = useIconsStore((state) => state.apps)
  const { width } = useWindowSize()
  const { apps, addApp } = useApps()

  const icons = useMemo(() => {
    return desktopIcons.map((app) => (
      <AppIcon
        key={app.id}
        id={app.id}
        isDraggable
        onDoubleClick={() => addApp({ name: app.id })}
        defaultPosition={{ x: app.x, y: app.y }}
        icon={app.icon}
        title={app.title}
      />
    ))
  }, [addApp])

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

          {icons}

          <WelcomeCard />
        </div>
      </main>
    </>
  )
}

export default Desktop
