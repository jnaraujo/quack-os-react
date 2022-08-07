import { useRef, useState } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { useClickAway } from "react-use";
import Title from "./Title";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  title: string;
  isDraggable?: boolean;
  defaultPosition?: { x: number; y: number };
  onDoubleClicked?: () => void;
  width?: number;
  height?: number;
}

const Content = styled.div<{
  width: number;
  icon: string;
  height: number;
  clicked: boolean;
}>`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
    props.clicked ? props.theme.colors.black : "transparent"};
  padding: 8px;

  .img {
    width: ${({ width }) => width * 0.8}px;
    height: ${({ width }) => width * 0.8}px;

    background-image: url(${({ icon }) => icon});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .title {
    font-size: 1rem;
    width: ${({ width }) => width}px;
    text-align: center;

    overflow-wrap: break-word;

    color: ${(props) => (props.clicked ? props.theme.colors.white : "black")};
  }
`;

export default function AppIcon({
  children,
  isDraggable,
  title,
  defaultPosition,
  icon,
  onDoubleClicked,
  width = 80,
  height = 80,
  ...props
}: Props) {
  const [clickCount, setClickCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    setClickCount((prev) => {
      if (prev === 1) {
        onDoubleClicked && onDoubleClicked();
        return 0;
      }
      return 1;
    });
  };

  useClickAway(ref, () => {
    setClickCount(0);
  });

  return (
    <>
      <Draggable
        disabled={isDraggable !== true}
        defaultPosition={defaultPosition}
        bounds="parent"
      >
        <Content
          ref={ref}
          width={width}
          height={height}
          clicked={clickCount === 1}
          onClick={onClick}
          icon={icon}
          {...props}
        >
          <div className="img" />
          <Title className="title">{title}</Title>
        </Content>
      </Draggable>
    </>
  );
}
