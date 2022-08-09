import { ReactNode } from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const TextComponent = styled.p`
  line-height: 1.5;
  margin: 0;
`;

export default function Text({ children, ...props }: Props) {
  return <TextComponent {...props}>{children}</TextComponent>;
}
