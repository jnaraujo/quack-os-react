import Card from "./Card";
import Title from "./Title";
import Text from "./Text";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import { useState } from "react";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;

  width: 100%;
  height: 100%;
`;

export default function WellcomeCard() {
  const { width, height } = useWindowSize();
  const [isOpen, setIsOpen] = useState(true);

  const cardWidth = 350;
  const cardHeight = 270;

  function close() {
    setIsOpen(false);
  }

  return (
    <Card
      defaultPosition={{
        x: width / 2 - cardWidth / 2,
        y: height / 2 - cardHeight / 2,
      }}
      width={cardWidth}
      height={cardHeight}
      isDraggable
      className="wellcomeCard"
      style={{
        display: isOpen ? "inherit" : "none",
      }}
    >
      <Content>
        <Title>Bem-vindo!</Title>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </Text>
        <button className="button" onClick={close}>
          Ok!
        </button>
      </Content>
    </Card>
  );
}
