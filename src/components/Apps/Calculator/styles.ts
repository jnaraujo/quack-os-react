import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  background-color: ${(props) => props.theme.colors.white};

  background-image: url("/pattern/dotted/lightAlt.svg");
  background-repeat: repeat;
  background-size: 150px;

  width: 300px;
  height: 420px;

  .display {
    width: 80%;
    height: 50px;
    background-color: ${(props) => props.theme.colors.white};
    border: 3px solid ${(props) => props.theme.colors.black};

    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 16px;

    p {
      margin: 0;
      padding: 0;
      font-size: 2rem;
      overflow: hidden;
    }
  }

  .buttons {
    height: 320px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        all: unset;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 40px;
        height: 40px;

        background-color: ${(props) => props.theme.colors.white};
        border: 3px solid ${(props) => props.theme.colors.black};

        box-shadow: 8px 8px 0px 0px ${(props) => props.theme.colors.black};

        font-size: 2rem;

        &:hover {
          cursor: pointer;
          background-color: ${(props) => props.theme.colors.black};
          color: ${(props) => props.theme.colors.white};
        }

        &.max {
          width: 100px;
        }
      }
    }
  }
`
