import { ReactNode, useEffect } from "react";
import { useWindowSize } from "react-use";

import { Container, Content } from "../../styles/Home";

// hooks
import { useApps } from "../../hooks/useApp";

// components
import AppIcon from "../../components/AppIcon";
import TopBar from "../../components/TopBar";
import Application from "../../components/Application";

// apps
import { AppsOnDesktop } from "./helper";
import Clock from "../../components/Clock";
import WellcomeCard from "../../components/WellcomeCard";

const Desktop = () => {
  const { apps, addApp } = useApps();
  const { width } = useWindowSize();

  useEffect(() => {
    addApp({
      node: Clock,
      id: "clock",
      title: "Clock",
      x: width - 400,
      y: 20,
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
              {...app}
            />
          ))}

          {AppsOnDesktop.map((app) => (
            <AppIcon
              key={app.id}
              isDraggable
              onDoubleClick={() =>
                onDoubleClick({
                  title: app.title,
                  id: app.id,
                  node: app.node,
                })
              }
              {...app}
            />
          ))}

          <WellcomeCard />
        </Content>
      </Container>
    </>
  );
};

export default Desktop;
