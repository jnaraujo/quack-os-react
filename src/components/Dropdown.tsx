import { ReactElement, useRef, useState } from "react";
import { useClickAway } from "react-use";
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

type Props = {
  trigger: ReactElement;
  items: {
    id: string;
    node: ReactElement;
  }[];
};

export default function Dropdown({ items, trigger }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);

  useClickAway(triggerRef, () => {
    setIsOpen(false);
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container ref={triggerRef}>
      <div className="trigger">
        <button onClick={handleClick}>{trigger}</button>
      </div>
      <ItemList isOpen={isOpen}>
        {items.map((item) => (
          <div key={item.id}>{item.node}</div>
        ))}
      </ItemList>
    </Container>
  );
}
