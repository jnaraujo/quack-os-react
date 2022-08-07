import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.black};

  width: 300px;
  height: 500px;
`;
