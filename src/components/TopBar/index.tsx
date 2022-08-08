import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import Dropdown from "../Dropdown";

import { useApps } from "../../hooks/useApp";

import { Container, OsIcon } from "./styles";
import { items } from "./helper";

export default function TopBar() {
  const apps = useApps();

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
        items={items(apps)}
      />
    </Container>
  );
}
