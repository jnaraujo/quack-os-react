import { createContext, useContext, useState } from "react"

interface IWindowContext {
  setIsResizable: (isResizable: boolean) => void
  isFullscreen: boolean
  appId: string

  setInitialSize: ({ width, height }: { width: number; height: number }) => void
  initialSize: { width: number; height: number }
}

const WindowContext = createContext({} as IWindowContext)

export const useWindow = () => useContext(WindowContext)

interface IWindowProvider extends IWindowContext {
  children: React.ReactNode
}

export function WindowProvider({
  children,
  setIsResizable,
  isFullscreen,
  appId,
  initialSize,
  setInitialSize,
}: IWindowProvider) {
  return (
    <WindowContext.Provider
      value={{
        setIsResizable,
        isFullscreen,
        appId,
        initialSize,
        setInitialSize,
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}
