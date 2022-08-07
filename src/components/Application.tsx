import Title from "./Title";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useWindowSize } from "react-use";
import { useApps } from "../hooks/appHook";

const Content = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.black};
  width: fit-content;
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.white};

  min-width: 200px;

  .loading {
    opacity: 0;
  }

  .application {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div {
      position: relative !important;
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    border: 2px solid ${({ theme }) => theme.colors.black};

    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};

    margin: 0;
    padding: 0;
    h1 {
      font-size: 1.2rem;
    }

    .close {
      width: 28px !important;
      height: 28px !important;
      background-color: white;
    }
  }
`;

interface IApplicationProps {
  children: React.ReactNode;
  title: string;
  id: string;
  x?: number;
  y?: number;
}

export default function Application(props: IApplicationProps) {
  const [isDraggable, setIsDraggable] = useState(false);

  const [loading, setLoading] = useState(true);

  const { removeApp } = useApps();
  const { width, height } = useWindowSize();

  const cardWidth = 350;
  const cardHeight = 270;

  const x = props.x != undefined ? props.x : width / 2 - cardWidth / 2;
  const y = props.y != undefined ? props.y : height / 2 - cardHeight / 2;

  const move = () => {
    setIsDraggable(true);
  };
  const stop = () => {
    setIsDraggable(false);
  };

  const close = () => {
    setTimeout(() => {
      removeApp(props.id);
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Draggable
      defaultPosition={{
        x,
        y,
      }}
      disabled={!isDraggable}
    >
      <Content>
        <div className="title" onMouseOver={move} onMouseOut={stop}>
          <div></div>
          <Title className={`${loading === true ? "loading" : "loaded"}`}>
            {props.title}
          </Title>
          <div className="close" onClick={close}></div>
        </div>

        <div
          className={`application ${loading === true ? "loading" : "loaded"}`}
        >
          {props.children}
        </div>
      </Content>
    </Draggable>
  );
}
