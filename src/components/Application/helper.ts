import { useState } from "react"

export function useWindowContext() {
  const [isResizable, setIsResizable] = useState(false)
  const [initialSize, setInitialSize] = useState({ width: 370, height: 270 })

  return {
    isResizable,
    setIsResizable,
    initialSize,
    setInitialSize,
  }
}
