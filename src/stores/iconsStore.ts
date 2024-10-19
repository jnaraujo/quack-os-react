import { create } from "zustand"
import { ApplicationName } from "../contexts/ApplicationContext"
import { persist } from "zustand/middleware"

interface Icon {
  id: ApplicationName
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
    (set, get) => ({
      apps: [],
      updatePos(id, pos) {
        set((state) => {
          const apps = state.apps.slice()
          let app = apps.find((app) => app.id === id)
          if (!app) {
            app = {
              id: id as any,
              x: 0,
              y: 0,
            }
            apps.push(app)
          }

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
