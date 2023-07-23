import { useEffect, useMemo, useState } from "react"
import { motion, useDragControls } from "framer-motion"
import { useWindowSize } from "react-use"
import { useApps } from "../../hooks/useApp"
import clsx from "clsx"
import AppWrapper from "./AppWrapper"
import { IApplicationProps } from "./types"

const cardWidth = 350
const cardHeight = 270

function Application({ Node, ...props }: IApplicationProps) {
  const controls = useDragControls()
  const [loading, setLoading] = useState(true)
  const [drag, setDrag] = useState(false)

  const { removeApp } = useApps()
  const { width, height } = useWindowSize()

  const position = useMemo(() => {
    if (props.x && props.y) {
      return {
        x: props.x,
        y: props.y,
      }
    }
    return {
      x: (width - cardWidth) / 2,
      y: (height - cardHeight) / 2,
    }
  }, [props.x, props.y, width, height])

  const move = (event: any) => {
    setDrag(true)
    controls.start(event)
  }

  const onDragEnd = () => {
    setDrag(false)
  }

  const close = () => {
    setTimeout(() => {
      removeApp(props.id)
    }, 300)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.1,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      drag={drag}
      onDragEnd={onDragEnd}
      dragControls={controls}
      dragMomentum={false}
      style={{
        position: "absolute",
        zIndex: 9999,
        x: position.x,
        y: position.y,
        width: cardWidth,
        height: cardHeight,
      }}
    >
      <div className="z-10 flex h-fit w-fit flex-col items-center justify-center overflow-hidden rounded-lg border-[6px] border-black">
        <div
          className="z-30 flex h-8 w-full items-center border-2 border-black bg-black text-white"
          onPointerDown={move}
        >
          <strong
            className={clsx("ml-auto block", {
              "opacity-0": loading === true,
            })}
          >
            {props.title}
          </strong>

          <div
            className="ml-auto flex h-6 w-6 cursor-pointer items-center justify-center bg-white text-2xl text-black"
            onClick={close}
          >
            x
          </div>
        </div>

        <div className={clsx(loading ? "bg-white" : "bg-black")}>
          <div
            className={clsx(
              "flex flex-col items-center justify-center overflow-hidden rounded-md bg-white",
              {
                "opacity-0": loading === true,
              },
            )}
          >
            <AppWrapper Node={Node} appID={props.id} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Application
