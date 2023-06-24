import { useState } from "react";
import { useWindowSize } from "react-use";
import Card from "../Apps/Card";
import Text from "../Text";
import Title from "../Title";
import { Content } from "./styles";

function WelcomeCard() {
  const { width, height } = useWindowSize();
  const [isOpen, setIsOpen] = useState(true);

  const cardWidth = 400;
  const cardHeight = 300;

  const handleClose = () => setIsOpen(false);

  return (
    <Card
      defaultPosition={{
        x: width / 2 - cardWidth / 2,
        y: height / 2 - cardHeight / 2,
      }}
      width={cardWidth}
      height={cardHeight}
      isDraggable
      className="welcomeCard"
      style={{
        display: isOpen ? "inherit" : "none",
      }}
    >
      <Content>
        <Title>Welcome to QuackOS!</Title>
        <Text>
          This is a simple (and fake) operating system made with ReactJS and
          Vite.
        </Text>
        <Text>I hope you enjoy it!</Text>
        <button className="button" onClick={handleClose}>
          I will do it!
        </button>
      </Content>
    </Card>
  );
}

export default WelcomeCard;
