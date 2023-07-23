import { useRef, useState } from "react"
import { useDragControls } from "framer-motion"
import { useClickAway } from "react-use"
import Title from "../Title"

import { ContentMotion } from "./styles"
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
      <ContentMotion
        drag={isDraggable}
        initial={defaultPosition}
        dragControls={controls}
        dragMomentum={false}
        ref={ref}
        onClickCapture={onClickContent}
        onDoubleClickCapture={onDoubleClick}
        clicked={clickCount === 1}
        icon={icon}
        width={width}
        height={height}
      >
        <div className="img" />
        <Title className="title">{title}</Title>
      </ContentMotion>
    </>
  )
}
