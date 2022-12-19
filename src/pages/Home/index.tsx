import { useEffect, useState } from "react";

import styled from "styled-components";
import Desktop from "../Desktop";
import Loading from "../Loading";

const Container = styled.div`
  all: unset;

  &.hidden {
    display: none;
  }
`;

export default function Main() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") setLoading(false);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Container className={loading === true ? "hidden" : "show"}>
        <Desktop />
      </Container>
    </>
  );
}
