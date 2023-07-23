import styled from "styled-components"

export const Container = styled.div`
  &.startedUp {
    div {
      display: none;
    }
  }

  background-color: ${({ theme }) => theme.colors.black};
  width: 100vw;
  height: 100vh;

  color: ${({ theme }) => theme.colors.white};

  * {
    margin: 0;
  }

  /* background-image: url("/pattern/dotted/medium.svg");
  background-size: 150px;
  background-repeat: repeat; */

  position: relative;
  margin: 0;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
  }
  div {
    h2 {
      font-size: 2rem;
      text-align: center;
    }
  }
`
