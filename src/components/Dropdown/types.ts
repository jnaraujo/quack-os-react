import { ReactElement } from "react";

interface IDropdownProps {
  trigger: ReactElement;
  items: {
    id: string;
    Node: ReactElement;
  }[];
}

export type { IDropdownProps };
