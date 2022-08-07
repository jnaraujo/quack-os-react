import { ReactNode, useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";

import { Container } from "../../styles/Home";

//hooks
import { useApps } from "../../hooks/appHook";

// components
import Text from "../../components/Text";
import Title from "../../components/Title";
import Card from "../../components/Card";
import AppIcon from "../../components/AppIcon";

// aplications
import Clock from "../../components/Clock";
import Application from "../../components/Application";
import WellcomeCard from "../../components/WellcomeCard";
import Terminal from "../../components/Terminal";

const Home = () => {
  const { apps, addApp } = useApps();
  const { width, height } = useWindowSize();

  useEffect(() => {
    console.log("clock");
    addApp({
      node: <Clock />,
      id: "clock",
      title: "Clock",
      x: width - 400,
      y: 20,
    });
  }, []);

  return (
    <>
      <Container>
        <AppIcon
          title="Clock"
          isDraggable
          icon="icons/clock/Clock_Face.svg"
          defaultPosition={{
            x: 20,
            y: 20,
          }}
          onDoubleClick={() =>
            addApp({
              node: <Clock />,
              id: "clock",
              title: "Clock",
            })
          }
        />

        <AppIcon
          title="Terminal"
          isDraggable
          icon="/icons/applications/calculator.svg"
          defaultPosition={{
            x: 20,
            y: 120,
          }}
          onDoubleClick={() =>
            addApp({
              node: <Terminal />,
              id: "terminal",
              title: "Terminal",
            })
          }
        />

        {apps.map((app) => (
          <Application
            key={app.id}
            title={app.title}
            id={app.id}
            x={app.x}
            y={app.y}
          >
            {app.node}
          </Application>
        ))}

        <WellcomeCard />
      </Container>
    </>
  );
};

export default Home;
