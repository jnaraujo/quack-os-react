import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApps } from "../../hooks/appHook";

import { Container } from "./styles";

const loadingChar = ["|", "/", "—", "\\"];

export default function Loading() {
  const [startedUp, setStartedUp] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  const { clearApps } = useApps();

  const navigate = useNavigate();

  useEffect(() => {
    clearApps();

    setTimeout(() => {
      setStartedUp(true);
    }, 500);
    const interval = setInterval(() => {
      setLoadingCount((prev) => {
        if (prev === 3) return 0;
        return prev + 1;
      });
    }, 300);

    setTimeout(() => {
      navigate("/os");
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container className={`${startedUp === false ? "startedUp" : ""}`}>
      <div className="brand">
        <img src="/brand/jna_white.svg" width={500} />
      </div>
      <div>
        <h2>ReactOS</h2>
        <h2>Beta Release</h2>
      </div>
      <div>
        <h2>{loadingChar[loadingCount]}</h2>
      </div>
      <div>
        <h2>Copyright (c) JNA Comporation, 1995. All Rights Reserved.</h2>
        <h2>ReactOS is a registered trademark of JNA Corp.</h2>
      </div>
    </Container>
  );
}
