import { create } from "zustand"
import { ApplicationName } from "../contexts/ApplicationContext"
import { persist } from "zustand/middleware"

interface Icon {
  title: string
  id: ApplicationName
  icon: string
  x: number
  y: number
}

interface IconsStore {
  apps: Icon[]
  updatePos: (
    id: ApplicationName,
    pos: {
      x: number
      y: number
    },
  ) => void
}

export const useIconsStore = create(
  persist<IconsStore>(
    (set) => ({
      apps: [
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
      ],
      updatePos(id, pos) {
        set((state) => {
          const apps = state.apps.slice()
          const app = apps.find((app) => app.id === id)
          if (!app) return state

          app.x = pos.x
          app.y = pos.y
          return {
            apps,
          }
        })
      },
    }),
    {
      name: "icons-store",
    },
  ),
)
