import styled from "styled-components";

const CardComponent = styled.div<{
    width: number;
    height: number;
    x: number;
    y: number;
}>`
  margin: 0;
  padding: 0;
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  display: flex;

  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.black};
  padding: 0.3rem;

  .inner {
    border: 5px solid ${({ theme }) => theme.colors.black};
    padding: 1rem;
    width: 100%;
    height: 100%;
  }
`;

export { CardComponent };