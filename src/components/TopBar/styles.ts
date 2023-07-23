import styled from "styled-components"

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};

  width: 100%;
  height: 40px;

  border-bottom: 4px solid ${({ theme }) => theme.colors.black};

  padding: 0 16px;
`

export const OSIcon = styled.div<{
  isActive: boolean
}>`
  width: 50px;
  height: 40px;
  background-image: url("/brand/duck.png");
  background-size: auto 80%;
  background-repeat: no-repeat;
  background-position: center;

  background-color: ${(props) =>
    props.isActive ? props.theme.colors.black : "transparent"};

  &:hover {
    cursor: pointer;
  }
`
