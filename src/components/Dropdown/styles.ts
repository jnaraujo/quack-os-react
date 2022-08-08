import styled from "styled-components";

const Container = styled.div`
  all: unset;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 0px;
  .trigger {
    all: unset;

    margin: 0;
    padding: 0;
    width: fit-content;
    height: 40px;
    button {
      all: unset;
      margin: 0;
      padding: 0;
    }
  }
`;

const ItemList = styled.div<{
    isOpen: boolean;
}>`
  z-index: 10;
  margin: 0;
  padding: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};

  background-color: ${({ theme }) => theme.colors.white};
  width: fit-content;
  min-width: 200px;

  > div {
    padding: 4px 16px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.black};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export { Container, ItemList };