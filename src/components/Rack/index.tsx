import { styled } from "goober";
import { FC, ReactNode } from "react";

const Grid = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100vh;
  border: 1px solid red;
  background: rgb(83, 80, 81);
  background: linear-gradient(
    180deg,
    rgba(83, 80, 81, 1) 0%,
    rgba(21, 20, 20, 1) 100%
  );
`;

export const Rack: FC<{ children: ReactNode }> = ({ children }) => {
  return <Grid>{children}</Grid>;
};
