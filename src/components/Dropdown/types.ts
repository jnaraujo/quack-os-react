import { ReactElement } from "react";

interface IDropdownProps {
    trigger: ReactElement;
    items: {
        id: string;
        node: ReactElement;
    }[];
};

export type { IDropdownProps };