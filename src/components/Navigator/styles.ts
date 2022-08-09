import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 600px;
  height: 400px;

  > div {
    display: flex;
    height: 25px;

    button {
      all: unset;
      display: flex;
      align-items: center;
      justify-content: center;

      background-image: url("icons/arrows/arrow/left.svg");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;

      width: 25px;
      height: 25px;
      min-height: 25px;
      min-width: 25px;
      padding: 0;
      margin: 0;
    }

    button:active {
      box-shadow: inset -1px -1px 6px 0px rgba(0, 0, 0, 0.43);
      cursor: pointer;
    }
    input {
      flex: 1;
    }
  }

  iframe {
    width: 100%;
    height: 100%;
  }

  .background {
    width: 100%;
    height: 100%;

    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 200px;
      height: 200px;
    }
  }
`;

export { Container };
