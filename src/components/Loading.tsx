import { styled } from 'goober';
import { FC } from 'react';
import Lottie, { LottieProps } from 'react-lottie';
import animationData from '../lotties/loader.json';
import { Container } from './ActivateAudio';

const defaultOptions: LottieProps['options'] = {
  loop: true,
  autoplay: true,
  animationData,
};

const LottieContainer = styled('div')`
  grid-column: 1/13;
  height: fit-content;
  margin: auto 0;
  text-align: center;
`;

export const Loading: FC = () => {
  return (
    <Container>
      <LottieContainer>
        <h1>Electrifying air...</h1>
        <Lottie isClickToPauseDisabled  options={defaultOptions} />
      </LottieContainer>
    </Container>
  );
};
