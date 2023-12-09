import { useEffect, useState } from "react"
import { useApps } from "../../hooks/useApp"
import clsx from "clsx"
import AppWrapper from "./AppWrapper"
import { IApplicationProps } from "./types"
import { WindowProvider } from "../../contexts/WindowContext"
import { useWindowContext } from "./helper"
import Draggable from "./Draggable"

function Application({ Node, ...props }: IApplicationProps) {
  const [drag, setDrag] = useState(false)
  const [mouse, setMouse] = useState<MouseEvent>()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [loading, setLoading] = useState(true)

  const { removeApp, setAppOnFocus } = useApps()
  const { isResizable, setIsResizable, initialSize, setInitialSize } =
    useWindowContext()

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
        style={{
          width: isFullscreen ? "100vw" : initialSize.width,
          height: isFullscreen ? "calc(100vh - 40px)" : initialSize.height,
        }}
        className={clsx(
          "flex flex-col items-center rounded-lg border-[6px] border-black",
        )}
        onMouseDown={() => {
          setAppOnFocus(props.id)
        }}
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
          )}
        >
          <WindowProvider
            appId={props.id}
            setIsResizable={setIsResizable}
            isFullscreen={isFullscreen}
            initialSize={initialSize}
            setInitialSize={setInitialSize}
          >
            <div
              className={clsx(
                "h-full w-full",
                loading ? "opacity-0" : "opacity-100",
              )}
            >
              <AppWrapper Node={Node} appID={props.id} />
            </div>
          </WindowProvider>
        </div>
      </div>
    </Draggable>
  )
}

export default Application
