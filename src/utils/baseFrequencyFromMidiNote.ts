import { pipe } from 'fp-ts/lib/function';
import { match } from 'ts-pattern';
import * as S from 'fp-ts/string';

export type Notes =
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'A'
  | 'B'
  | 'C#'
  | 'D#'
  | 'F#'
  | 'G#'
  | 'F#'
  | 'A#';
export type Octaves = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type NotesIdentifier = `${Notes}${Octaves}`;

//frequency values took here: https://www.doctormix.com/blog/note-to-frequency-chart
export const baseFrequencyFromMidiNote = (note: Notes): number =>
  match(note)
    .with('C', () => 32.7032)
    .with('C#', () => 34.6478)
    .with('D', () => 36.7081)
    .with('D#', () => 38.8909)
    .with('E', () => 41.2034)
    .with('F', () => 43.6535)
    .with('F#', () => 46.2493)
    .with('G', () => 48.9994)
    .with('G#', () => 51.9131)
    .with('A', () => 55)
    .with('A#', () => 58.27)
    .with('B', () => 61.735)
    .exhaustive();

export const octaveMultiplier = (octave: Octaves) => Math.pow(2, octave);

export const frequencyFromMIDIIdentifier = (
  identifier: NotesIdentifier
): number =>
  pipe(
    identifier,
    (identifier) => ({
      size: S.size(identifier),
      identifier,
    }),
    ({ size, identifier }) =>
      match(size)
        .with(2, () =>
          pipe(
            identifier,
            S.split(''),
            ([note, octave]) =>
              baseFrequencyFromMidiNote(note as Notes) *
              octaveMultiplier(parseInt(octave) as Octaves)
          )
        )
        .with(3, () =>
          pipe(
            identifier,
            S.split(''),
            ([note, sharp, octave]) =>
              baseFrequencyFromMidiNote((note + sharp) as Notes) *
              octaveMultiplier(parseInt(octave) as Octaves)
          )
        )
        .otherwise(() => 0)
  );
