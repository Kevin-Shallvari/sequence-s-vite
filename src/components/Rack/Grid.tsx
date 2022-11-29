import { styled } from 'goober';
import { FC, ReactNode } from 'react';
import { colors } from '../../utils/colors';

const Grid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  height: 100vh;
  background: ${colors.black.dark};
  background: ${`linear-gradient(
    90deg,
    ${colors.black.dark} 0%,
    ${colors.black.base} 51%,
    ${colors.black.dark} 97%
  )`};
`;

const Rack = styled('div')`
  display: flex;
  width: 100%;
  grid-column: 2/3;
`;

const Wood = styled<{ direction: 'left' | 'right' }>('div')(
  ({ direction }) => `
    width: 1rem;
    background-image: url("src/assets/wood-texture.jpg");
    filter: ${
      direction === 'left'
        ? 'drop-shadow(0.5rem 0 0.75rem #111111)'
        : 'drop-shadow(-0.5rem 0 0.75rem #111111)'
    };
  `
);

export const GridRack: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Grid>
      <Rack>
        <Wood direction="left" />
        {children}
        <Wood direction="right" />
      </Rack>
    </Grid>
  );
};
