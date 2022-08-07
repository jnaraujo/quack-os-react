import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "./styles";

export default function Loading() {
  const [loadingText, setLoadingText] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === 2) return 0;
        return prev + 1;
      });
    }, 300);

    setTimeout(() => {
      navigate("/home");
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <div className="brand">
        <img src="/brand/jna_white.svg" width={500} />
      </div>
      <div>
        <h2>ReactOS</h2>
        <h2>Beta Release</h2>
      </div>
      <div>
        <h2>{String("").padStart(loadingText + 1, ".")}</h2>
      </div>
      <div>
        <h2>Copyright (c) JNT Comporation, 1995. All Rights Reserved.</h2>
        <h2>ReactOS is a registered trademark of JNT Corp.</h2>
      </div>
    </Container>
  );
}
