import { useRef, useState } from "react"
import { useClickAway } from "react-use"
import { Container, ItemList } from "./styles"
import { IDropdownProps } from "./types"

export default function Dropdown({ items, trigger }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const triggerRef = useRef<HTMLDivElement>(null)

  useClickAway(triggerRef, () => {
    setIsOpen(false)
  })

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Container ref={triggerRef}>
      <div className="trigger">
        <button onClick={handleClick}>{trigger}</button>
      </div>
      <ItemList isOpen={isOpen}>
        {items.map((item) => (
          <div key={item.id}>{item.Node}</div>
        ))}
      </ItemList>
    </Container>
  )
}
