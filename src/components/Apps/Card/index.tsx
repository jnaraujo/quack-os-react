import { CardComponent } from "./styles"
import { ICardProps } from "./types"

export default function Card({
  children,
  isDraggable,
  defaultPosition,
  width = 500,
  height = 500,
  ...props
}: ICardProps) {
  return (
    <CardComponent
      x={defaultPosition?.x || 0}
      y={defaultPosition?.y || 0}
      width={width}
      height={height}
      {...props}
    >
      <div className="inner">{children}</div>
    </CardComponent>
  )
}
