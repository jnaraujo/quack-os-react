import { lazy, useEffect, useState } from "react";

import Loading from "./Loading";
import Desktop from "./Desktop";
import styled from "styled-components";

const Container = styled.div`
  all: unset;

  &.hidden {
    display: none;
  }
`;

export default function Main() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
