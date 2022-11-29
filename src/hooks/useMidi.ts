import { useCallback, useEffect, useState } from 'react'
import { WebMidi } from 'webmidi'
import { NotesIdentifier } from '../utils/baseFrequencyFromMidiNote'

type Gate = 0 | 1

type GatedNote = {
  note: NotesIdentifier | null
  gate: Gate
}

export const useMidi = () => {
  const [gatedNote, setGatedNote] = useState<GatedNote>({
    gate: 0,
    note: null
  })

  const memoNoteOn = useCallback(
    () =>
      WebMidi.getInputByName('Arturia MicroFreak')?.addListener('noteon', (e) => {
        setGatedNote({ note: e.note.identifier as NotesIdentifier, gate: 1 })
      }),
    []
  )

  const memoNoteOff = useCallback(
    () =>
      WebMidi.getInputByName('Arturia MicroFreak')?.addListener('noteoff', (e) => {
        setGatedNote({ note: e.note.identifier as NotesIdentifier, gate: 0 })
      }),
    []
  )

  useEffect(() => {
    memoNoteOn()
    memoNoteOff()
    return () => {
      WebMidi.getInputByName('Arturia MicroFreak')?.removeListener('noteoff')
      WebMidi.getInputByName('Arturia MicroFreak')?.removeListener('noteon')
    }
  }, [])

  return gatedNote
}
