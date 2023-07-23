import { ReactElement } from "react"

interface IDropdownProps {
  children: ReactElement
  isOpen: boolean
  close: () => void
  items: {
    id: string
    Node: ReactElement
  }[]
}

export type { IDropdownProps }
