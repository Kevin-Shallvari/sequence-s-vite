import { constNull } from 'fp-ts/lib/function'
import { match } from 'ts-pattern'
import { NotesIdentifier, Octaves } from './baseFrequencyFromMidiNote'
import * as iots from 'io-ts'

export const playableMidiKeyboard = iots.readonly(
  iots.keyof({
    j: null,
    a: null,
    w: null,
    s: null,
    e: null,
    d: null,
    f: null,
    t: null,
    g: null,
    y: null,
    h: null,
    u: null
  })
)
type PlayableMidiKeyboard = iots.TypeOf<typeof playableMidiKeyboard>

export const octaveKeyboardKey = iots.readonly(
  iots.keyof({
    z: null,
    x: null
  })
)

export const fromKeyBoardToMidiIdentifier = (key: PlayableMidiKeyboard, octave: Octaves): NotesIdentifier | null => {
  const note = match(key)
    .with('j', () => 'B' as const)
    .with('a', () => 'C' as const)
    .with('w', () => 'C#' as const)
    .with('s', () => 'D' as const)
    .with('e', () => 'D#' as const)
    .with('d', () => 'E' as const)
    .with('f', () => 'F' as const)
    .with('t', () => 'F#' as const)
    .with('g', () => 'G' as const)
    .with('y', () => 'G#' as const)
    .with('h', () => 'A' as const)
    .with('u', () => 'A#' as const)
    .otherwise(constNull)

  return `${note}${octave}` as NotesIdentifier
}
