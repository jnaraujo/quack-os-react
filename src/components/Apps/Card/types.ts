import { ReactNode } from "react";

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    isDraggable?: boolean;
    width?: number;
    height?: number;
    defaultPosition?: { x: number; y: number };
}

export type { ICardProps };