import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import Dropdown from "../Dropdown";
import { Container, OsIcon } from "./styled";

import Terminal from "../../components/Terminal";
import { useApps } from "../../hooks/appHook";

export default function TopBar() {
  const { addApp } = useApps();

  const [osDrop, setOsDrop] = useState(false);

  const containerRef = useRef(null);

  const osIconRef = useRef<HTMLDivElement>(null);

  useClickAway(containerRef, () => {
    setOsDrop(false);
  });

  return (
    <Container ref={containerRef}>
      <Dropdown
        trigger={
          <OsIcon
            ref={osIconRef}
            isActive={osDrop}
            onClick={() => setOsDrop(!osDrop)}
          />
        }
        items={[
          {
            id: "1",
            node: <div>About the ReactOS</div>,
          },
          {
            id: "2",
            node: (
              <div
                onClick={() =>
                  addApp({
                    id: "terminal",
                    title: "Terminal",
                    node: <Terminal />,
                  })
                }
              >
                Open Terminal
              </div>
            ),
          },
        ]}
      />
    </Container>
  );
}
