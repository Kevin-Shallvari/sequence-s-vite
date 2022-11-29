import { proxy } from 'valtio';
import { Octaves } from '../utils/baseFrequencyFromMidiNote';

type Values = {
  octave: Octaves;
};

type Update = (action: 'increase' | 'decrease') => Values;

type Store = {
  values: Values;
  update: Update;
};

export const octaves: Store = proxy<Store>({
  values: { octave: 4 },
  update: (action: 'increase' | 'decrease') => {
    if (
      (octaves.values.octave === 0 && action === 'decrease') ||
      (octaves.values.octave === 9 && action === 'increase')
    )
      return octaves.values;
    if (action === 'increase')
      return (octaves.values = {
        ...octaves.values,
        octave: (octaves.values.octave + 1) as Octaves,
      });
    return (octaves.values = {
      ...octaves.values,
      octave: (octaves.values.octave - 1) as Octaves,
    });
  },
});
