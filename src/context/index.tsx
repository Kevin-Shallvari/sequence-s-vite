import { constVoid } from 'fp-ts/lib/function'
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'
import { NotesIdentifier, Octaves } from '../utils/baseFrequencyFromMidiNote'

type Gate = 0 | 1

export const NoteContext = createContext<{
  note: NotesIdentifier | null
  gate: Gate
  octave: Octaves
  setNote: Dispatch<SetStateAction<NotesIdentifier | null>>
  setGate: Dispatch<SetStateAction<Gate>>
  setOctave: Dispatch<SetStateAction<Octaves>>
}>({
  note: null,
  gate: 0,
  octave: 4,
  setGate: constVoid,
  setNote: constVoid,
  setOctave: constVoid
})

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [note, setNote] = useState<NotesIdentifier | null>(null)
  const [gate, setGate] = useState<Gate>(0)
  const [octave, setOctave] = useState<Octaves>(4)

  return (
    <NoteContext.Provider value={{ note, setNote, gate, setGate, octave, setOctave }}>{children}</NoteContext.Provider>
  )
}
