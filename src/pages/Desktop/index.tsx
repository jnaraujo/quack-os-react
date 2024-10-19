import { useEffect, useMemo } from "react"
import { useWindowSize } from "react-use"
import { useApps } from "../../hooks/useApp"
import AppIcon from "../../components/AppIcon"
import TopBar from "../../components/TopBar"
import Application from "../../components/Application"
import WelcomeCard from "../../components/WelcomeCard"
import { useIconsStore } from "../../stores/iconsStore"
import { ApplicationName } from "../../contexts/ApplicationContext"

interface Icon {
  title: string
  id: ApplicationName
  icon: string
  x: number
  y: number
}

const desktopIcons: Array<Icon> = [
  {
    title: "Clock",
    id: "clock",
    icon: "icons/clock/Clock_Face.svg",
    x: 10,
    y: 10,
  },
  {
    title: "Terminal",
    id: "terminal",
    icon: "/icons/applications/terminal.png",
    x: 10,
    y: 10,
  },
  {
    title: "Duck's Boat Navigator",
    id: "navigator",
    icon: "/icons/applications/Brosen_windrose.svg",
    x: 10,
    y: 10,
  },
  {
    title: "Calculator",
    id: "calculator",
    icon: "/icons/applications/calculator.svg",
    x: 10,
    y: 10,
  },
  {
    title: "PyIDE",
    id: "pyide",
    icon: "/icons/applications/pyide.png",
    x: 10,
    y: 10,
  },
  {
    title: "QuaChat",
    id: "quachat",
    icon: "/icons/applications/quachat.png",
    x: 10,
    y: 10,
  },
]

const Desktop = () => {
  const iconsStoreApps = useIconsStore((state) => state.apps)
  const { width } = useWindowSize()
  const { apps, addApp } = useApps()

  const icons = useMemo(() => {
    return desktopIcons.map((app) => {
      let x = app.x,
        y = app.y

      const ic = iconsStoreApps.find((i) => i.id === app.id)
      if (ic) {
        x = ic.x
        y = ic.y
      }

      return (
        <AppIcon
          key={app.id}
          id={app.id}
          isDraggable
          onDoubleClick={() => addApp({ name: app.id })}
          defaultPosition={{ x: x, y: y }}
          icon={app.icon}
          title={app.title}
        />
      )
    })
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
