import { proxy } from 'valtio';
import { NotesIdentifier } from '../utils/baseFrequencyFromMidiNote';

type Gate = 0 | 1;

type Values = {
  note: NotesIdentifier | null;
  gate: Gate;
};

type Update = (arg: Partial<Values>) => Values;

type Store = {
  values: Values;
  update: Update;
};

export const gatedNote: Store = proxy<Store>({
  values: { gate: 0, note: null },
  update: (arg: Partial<Values>) =>
    (gatedNote.values = { ...gatedNote.values, ...arg }),
});
