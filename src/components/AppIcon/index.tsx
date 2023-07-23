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
  const [clickCount, setClickCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const controls = useDragControls()

  const onClickContent = () => {
    setClickCount((prev) => {
      if (prev === 1) {
        return 0
      }
      return 1
    })
  }

  useClickAway(ref, () => {
    setClickCount(0)
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
        onDoubleClickCapture={onDoubleClick}
        className={clsx(
          "flex h-fit w-fit flex-col items-center justify-center p-2",
          {
            "bg-black": clickCount === 1,
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
            "text-white": clickCount === 1,
            "text-black": clickCount === 0,
          })}
        >
          {title}
        </strong>
      </motion.div>
    </>
  )
}
