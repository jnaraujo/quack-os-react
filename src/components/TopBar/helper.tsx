import { lazy } from "react"
import { ApplicationType } from "../../types/ApplicationType"
const Terminal = lazy(() => import("../Apps/Terminal"))
const WelcomeCard = lazy(() => import("../WelcomeCard"))

const items = (useApps: ApplicationType) => {
  const { addApp } = useApps

  return [
    {
      id: "1",
      Node: (
        <button
          onClick={() =>
            addApp({
              id: "terminal",
              title: "Terminal",
              Node: Terminal,
              start: Date.now(),
            })
          }
        >
          Open Terminal
        </button>
      ),
    },
  ]
}

export { items }
