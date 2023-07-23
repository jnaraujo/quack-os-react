import styled from "styled-components"

const Container = styled.div`
  width: 500px;
  height: 300px;

  .terminal {
    background-color: ${({ theme }) => theme.colors.white} !important;
    color: ${({ theme }) => theme.colors.black} !important;
    border-radius: 0 !important;

    .text {
      color: ${({ theme }) => theme.colors.black} !important;
      font-family: "Fixedsys Excelsior", monospace !important;
    }

    .content {
    }

    .inputArea {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
    }
  }
`

export { Container }
