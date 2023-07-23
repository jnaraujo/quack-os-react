import { useContext } from "react"
import { ApplicationContext } from "../contexts/ApplicationContext"

export function useApps() {
  const context = useContext(ApplicationContext)
  if (!context)
    throw new Error("useApps must be used within an ApplicationProvider")
  return context
}
