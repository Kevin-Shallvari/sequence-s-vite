import { styled } from 'goober';
import { colors } from '../../utils/colors';

export const PrimaryButton = styled('button')`
  padding: 1rem;
  border-radius: 0.75rem;
  outline: none;
  border: 2px solid ${colors.orange.base};
  background-color: ${colors.blue.base};
  color: ${colors.white.base};
  text-transform: uppercase;
  margin-bottom: 1rem;
`;
