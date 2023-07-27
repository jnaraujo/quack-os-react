import { useEffect, useMemo, useState } from "react"
import { useWindowSize } from "react-use"
import { useApps } from "../../hooks/useApp"
import clsx from "clsx"
import AppWrapper from "./AppWrapper"
import { IApplicationProps } from "./types"
import { WindowProvider } from "../../contexts/WindowContext"
import { useWindowContext } from "./helper"
import Draggable from "./Draggable"

function Application({ Node, ...props }: IApplicationProps) {
  const { removeApp } = useApps()

  const { isResizable, setIsResizable, initialSize, setInitialSize } =
    useWindowContext()

  const [drag, setDrag] = useState(false)
  const [mouse, setMouse] = useState<MouseEvent>()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [loading, setLoading] = useState(true)

  const move = (event: any) => {
    setMouse(event)
    setDrag(true)
  }

  const close = () => {
    setTimeout(() => {
      removeApp(props.id)
    }, 300)
  }

  function handleFullscreen() {
    setIsFullscreen((prev) => !prev)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  return (
    <Draggable
      drag={!isFullscreen && drag}
      mouse={mouse}
      setDrag={setDrag}
      x={props.x}
      y={props.y}
      isFullscreen={isFullscreen}
      initialHeight={initialSize.height}
      initialWidth={initialSize.width}
    >
      <div
        className={clsx(
          "z-10 flex h-full w-full flex-col items-center rounded-lg border-[6px] border-black",
          {
            "h-[calc(100vh_-_40px)] w-screen": isFullscreen,
          },
        )}
      >
        <div
          className="z-30 mt-0 flex h-8 w-full select-none items-center border-2 border-black bg-black text-white"
          onPointerDown={move}
        >
          <strong
            className={clsx("ml-auto block", {
              "opacity-0": loading === true,
            })}
          >
            {props.title}
          </strong>

          <div className="ml-auto flex w-fit gap-2">
            {isResizable && (
              <button
                onClick={handleFullscreen}
                className="flex h-6 w-6 items-center justify-center bg-white text-2xl text-black"
              >
                =
              </button>
            )}
            <button
              className="flex h-6 w-6 items-center justify-center bg-white text-2xl text-black"
              onClick={close}
            >
              x
            </button>
          </div>
        </div>

        <div
          className={clsx(
            "flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md bg-white",
            {
              "opacity-0": loading === true,
            },
          )}
        >
          <WindowProvider
            appId={props.id}
            setIsResizable={setIsResizable}
            isFullscreen={isFullscreen}
            initialSize={initialSize}
            setInitialSize={setInitialSize}
          >
            <AppWrapper Node={Node} appID={props.id} />
          </WindowProvider>
        </div>
      </div>
    </Draggable>
  )
}

export default Application
