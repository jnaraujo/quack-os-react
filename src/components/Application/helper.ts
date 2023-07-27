import { useState } from "react"

export function useWindowContext() {
  const [isResizable, setIsResizable] = useState(false)
  const [initialSize, setInitialSize] = useState({ width: 500, height: 400 })

  return {
    isResizable,
    setIsResizable,
    initialSize,
    setInitialSize,
  }
}
