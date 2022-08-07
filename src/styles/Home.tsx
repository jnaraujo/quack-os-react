import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.red};

  background-image: url("/pattern/dotted/medium.svg");
  background-size: 5px 5px;
  background-repeat: repeat;

  .teste {
    width: 200px;
  }
`;
