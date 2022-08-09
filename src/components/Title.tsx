import { ReactNode } from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const TitleComponent = styled.h1`
  line-height: 1.3;
  margin: 0;
`;

export default function Title({ children, ...props }: Props) {
  return <TitleComponent {...props}>{children}</TitleComponent>;
}
