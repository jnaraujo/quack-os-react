import styled from "styled-components";

const Content = styled.div`
  position: absolute;
  z-index: 3;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 6px solid ${({ theme }) => theme.colors.black};

  border-radius: 8px;
  overflow: hidden;

  width: fit-content;
  height: fit-content;

  .back {
    background-color: ${({ theme }) => theme.colors.white};
  }

  min-width: 200px;

  .loading {
    opacity: 0;
  }

  .application {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div {
      position: relative !important;
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    border: 2px solid ${({ theme }) => theme.colors.black};

    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};

    margin: 0;
    padding: 0;
    h1 {
      font-size: 1.2rem;
    }

    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px !important;
      height: 28px !important;
      background-color: white;
      cursor: pointer;
      color: black;
      font-size: 2rem;
      span {
        position: absolute;
        top: -15px;
      }
    }
  }
`;

export { Content };
