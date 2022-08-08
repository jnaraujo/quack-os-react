import styled from "styled-components";

const Content = styled.div<{
    width: number;
    icon: string;
    height: number;
    clicked: boolean;
}>`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
        props.clicked ? props.theme.colors.black : "transparent"};
  padding: 8px;

  .img {
    width: ${({ width }) => width * 0.8}px;
    height: ${({ width }) => width * 0.8}px;

    background-image: url(${({ icon }) => icon});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .title {
    font-size: 1rem;
    width: ${({ width }) => width}px;
    text-align: center;

    overflow-wrap: break-word;

    color: ${(props) => (props.clicked ? props.theme.colors.white : "black")};
  }
`;

export { Content };