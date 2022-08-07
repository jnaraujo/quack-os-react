import Card from "./Card";
import Title from "./Title";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;

  width: 100%;
  height: 100%;

  .clock {
    font-size: 2rem;
  }
`;

export default function Clock() {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const { width } = useWindowSize();

  const cardWidth = 350;
  const cardHeight = 150;

  const updateClock = () => {
    const date = new Date();
    setTime({
      hours: String(date.getHours()).padStart(2, "0"),
      minutes: String(date.getMinutes()).padStart(2, "0"),
      seconds: String(date.getSeconds()).padStart(2, "0"),
    });
  };

  useEffect(() => {
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card width={cardWidth} height={cardHeight}>
      <Content>
        <Title className="clock">{`${time.hours} : ${time.minutes} : ${time.seconds}`}</Title>
      </Content>
    </Card>
  );
}
