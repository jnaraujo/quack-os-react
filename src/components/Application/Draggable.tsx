import { motion, useDragControls } from "framer-motion"
import { useEffect, useMemo } from "react"
import { useWindowSize } from "react-use"

interface Props {
  children: React.ReactNode

  drag: boolean
  setDrag: (drag: boolean) => void

  mouse?: MouseEvent

  isFullscreen?: boolean

  x?: number
  y?: number

  initialWidth: number
  initialHeight: number
}

export default function Draggable({
  children,
  x,
  y,
  drag,
  setDrag,
  mouse,
  initialHeight,
  initialWidth,
  isFullscreen,
}: Props) {
  const controls = useDragControls()
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (drag && mouse && !isFullscreen) {
      controls.start(mouse)
    }
  }, [drag])

  const onDragEnd = () => {
    setDrag(false)
  }

  const initialPosition = useMemo(() => {
    if (x !== undefined && y !== undefined) {
      return {
        x: x,
        y: y,
      }
    }
    return {
      x: (width - initialWidth) / 2,
      y: (height - initialHeight) / 2,
    }
  }, [x, y, width, height])

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.1,
        x: initialPosition.x,
        y: initialPosition.y,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: isFullscreen ? 0 : initialPosition.x,
        y: isFullscreen ? 0 : initialPosition.y,
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
        zIndex: 25,
        width: isFullscreen ? "100%" : "fit-content",
        height: isFullscreen ? "100%" : "fit-content",
      }}
    >
      {children}
    </motion.div>
  )
}
