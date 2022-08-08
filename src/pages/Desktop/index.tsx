import { ReactNode, useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";

import { Container, Content } from "../../styles/Home";

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
import Navigator from "../../components/Navigator";
import TopBar from "../../components/TopBar";
import Calculator from "../../components/Calculator";

const AppsOnDesktop = [
  {
    title: "Clock",
    id: "clock",
    icon: "icons/clock/Clock_Face.svg",
    defaultPosition: {
      x: 20,
      y: 20,
    },
    node: Clock,
  },
  {
    title: "Terminal",
    id: "terminal",
    icon: "/icons/applications/Terminal.png",
    defaultPosition: {
      x: 20,
      y: 20,
    },
    node: Terminal,
  },
  {
    title: "Duck's Boat Navigator",
    id: "navigator",
    icon: "/icons/applications/Brosen_windrose.svg",
    defaultPosition: {
      x: 20,
      y: 20,
    },
    node: Navigator,
  },
  {
    title: "Calculator",
    id: "calculator",
    icon: "/icons/applications/calculator.svg",
    defaultPosition: {
      x: 20,
      y: 20,
    },
    node: Calculator,
  },
];

const Desktop = () => {
  const { apps, addApp } = useApps();
  const { width, height } = useWindowSize();

  useEffect(() => {
    addApp({
      node: Clock,
      id: "clock",
      title: "Clock",
      x: width - 400,
      y: 20,
      start: Date.now(),
    });
  }, []);

  const onDoubleClick = (app: {
    title: string;
    id: string;
    node: ReactNode | any;
  }) => {
    return addApp({
      node: app.node,
      id: app.id,
      title: app.title,
      start: Date.now(),
    });
  };

  return (
    <>
      <Container>
        <TopBar />

        <Content>
          {apps.map((app) => (
            <Application
              key={app.id}
              title={app.title}
              id={app.id}
              x={app.x}
              y={app.y}
              node={app.node}
            />
          ))}

          {AppsOnDesktop.map((app) => (
            <AppIcon
              key={app.id}
              title={app.title}
              icon={app.icon}
              defaultPosition={app.defaultPosition}
              isDraggable
              onDoubleClick={() =>
                onDoubleClick({
                  title: app.title,
                  id: app.id,
                  node: app.node,
                })
              }
            />
          ))}

          <WellcomeCard />
        </Content>
      </Container>
    </>
  );
};

export default Desktop;
