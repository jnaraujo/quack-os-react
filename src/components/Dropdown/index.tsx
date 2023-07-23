import { useRef, useState } from "react"
import { useClickAway } from "react-use"
import { IDropdownProps } from "./types"
import clsx from "clsx"

export default function Dropdown({
  items,
  isOpen,
  children,
  close,
}: IDropdownProps) {
  const triggerRef = useRef<HTMLDivElement>(null)

  useClickAway(triggerRef, () => {
    close()
  })
  return (
    <div className="relative z-20 w-fit" ref={triggerRef}>
      {children}
      <div
        className={clsx("flex w-fit min-w-[200px] flex-col bg-white", {
          hidden: !isOpen,
        })}
      >
        {items.map((item) => (
          <div
            className="cursor-pointer select-none px-3 py-1 hover:bg-black hover:text-white"
            key={item.id}
          >
            {item.Node}
          </div>
        ))}
      </div>
    </div>
  )
}
