import { useRef, useState } from "react"
import { useDragControls } from "framer-motion"
import { useClickAway } from "react-use"
import { motion } from "framer-motion"
import clsx from "clsx"

import { IAppIconProps } from "./types"

export default function AppIcon({
  onDoubleClick,
  defaultPosition,
  isDraggable,
  title,
  width = 80,
  height = 80,
  icon,
}: IAppIconProps) {
  const [showAppBg, setShowAppBg] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const controls = useDragControls()

  const onClickContent = () => {
    const isDoubleClick = clickCount === 1

    if (isDoubleClick) {
      onDoubleClick?.()
    }

    const timeout = setTimeout(() => {
      setClickCount(0)
    }, 300)

    setClickCount((prev) => {
      if (prev === 1) {
        setShowAppBg(false)
        return 0
      }
      setShowAppBg(true)
      return 1
    })

    return () => clearTimeout(timeout)
  }

  useClickAway(ref, () => {
    setClickCount(0)
    setShowAppBg(false)
  })

  return (
    <>
      <motion.div
        drag={isDraggable}
        initial={defaultPosition}
        dragControls={controls}
        dragMomentum={false}
        ref={ref}
        onClickCapture={onClickContent}
        className={clsx(
          "flex h-fit w-fit flex-col items-center justify-center p-2",
          {
            "bg-black": showAppBg,
          },
        )}
      >
        <div
          style={{
            width: width * 0.8,
            height: width * 0.8,
            backgroundImage: `url(${icon})`,
          }}
          className={clsx(`bg-contain bg-center bg-no-repeat`)}
        />
        <strong
          style={{ width: width * 1.2 }}
          className={clsx("break-words text-center", {
            "text-white": showAppBg,
            "text-black": !showAppBg,
          })}
        >
          {title}
        </strong>
      </motion.div>
    </>
  )
}
