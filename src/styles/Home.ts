import styled from "styled-components";

export const Container = styled.div`
  overflow: hidden;
  position: relative;
  margin: 0;
  padding: 0;

  width: 100vw;
  height: 100vh;

  /* background-image: url("/pattern/hatch/light.svg"); */

  background-color: ${({ theme }) => theme.colors.blue};
  background-image: url("/brand/duck.png");
  background-size: 200px 200px;
  background-repeat: no-repeat;
  background-position: center;

  .teste {
    width: 200px;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  background-image: url("/pattern/dotted/lightAlt.svg");
  background-size: 50px;
  background-repeat: repeat;
`;
