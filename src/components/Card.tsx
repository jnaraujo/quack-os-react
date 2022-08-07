import { ReactNode } from "react";
import styled from "styled-components";
import Draggable from "react-draggable"; // The default

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isDraggable?: boolean;
  width?: number;
  height?: number;
  defaultPosition?: { x: number; y: number };
}

export default function Card({
  children,
  isDraggable,
  defaultPosition,
  width = 500,
  height = 500,
  ...props
}: Props) {
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
  );
}

const CardComponent = styled.div<{
  width: number;
  height: number;
  x: number;
  y: number;
}>`
  margin: 0;
  padding: 0;
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  display: flex;

  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.black};
  padding: 0.3rem;

  .inner {
    border: 5px solid ${({ theme }) => theme.colors.black};
    padding: 1rem;
    width: 100%;
    height: 100%;
  }
`;
