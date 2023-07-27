import { useRef, useState } from "react"
import { useClickAway } from "react-use"
import Dropdown from "../Dropdown"

import { useApps } from "../../hooks/useApp"

import { items } from "./helper"
import clsx from "clsx"

export default function TopBar() {
  const apps = useApps()

  const [isActive, setIsActive] = useState(false)
  const [open, setOpen] = useState(false)

  const containerRef = useRef(null)

  const osIconRef = useRef<HTMLButtonElement>(null)

  useClickAway(containerRef, () => {
    setIsActive(false)
  })

  return (
    <div
      className="relative z-[9999] h-9 w-full border-b-[4px] border-black bg-white px-4"
      ref={containerRef}
    >
      <Dropdown
        isOpen={open}
        close={() => {
          setOpen(false)
        }}
        items={items(apps)}
      >
        <button
          ref={osIconRef}
          onClick={() => {
            setIsActive((prev) => !prev)
            setOpen((prev) => !prev)
          }}
          style={{
            backgroundImage: "url('/brand/duck.png')",
            backgroundSize: "auto 80%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className={clsx("flex h-9 w-9 items-center justify-center", {
            "bg-black": isActive,
          })}
        />
      </Dropdown>
    </div>
  )
}
