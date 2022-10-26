interface IAppIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  title: string;
  isDraggable?: boolean;
  defaultPosition?: { x: number; y: number };
  onDoubleClick?: () => void;
  width?: number;
  height?: number;
}

export type { IAppIconProps };
