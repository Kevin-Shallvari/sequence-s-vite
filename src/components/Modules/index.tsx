import { FC, useContext, useEffect } from 'react';
import { el } from '@elemaudio/core';
import { styled } from 'goober';
import { frequencyFromMIDIIdentifier } from '../../utils/baseFrequencyFromMidiNote';
import { core } from '../../globals/renderer';
import { audio } from '../../globals/audio';
import { NoteContext } from '../../context';

const Container = styled('div')`
  width: 100%;
`;

const cycle = (fq: number, gate: number) =>
  el.sin(el.mul(gate * 2.0 * Math.PI, el.phasor(fq, 1)));

const main = async () => {
  const node = await core.initialize(audio, {
    numberOfInputs: 0,
    numberOfOutputs: 1,
    outputChannelCount: [2],
  });

  node.connect(audio.destination);
};

main();

export const Modules: FC = () => {
  const {gate, note} = useContext(NoteContext)

  useEffect(() => {
    if (!note) return;
    core.render(cycle(frequencyFromMIDIIdentifier(note), gate));
  }, [note, gate]);

  return (
    <Container>
      <button>Resume audio</button>
    </Container>
  );
};
