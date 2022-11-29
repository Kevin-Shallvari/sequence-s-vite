import { FC, useContext, useEffect, useRef } from 'react'
import * as E from 'fp-ts/Either'
import { Modules } from './components/Modules'
import { MIDI } from './components/Modules/MIDI'
import { GridRack } from './components/Rack/Grid'
import { pipe, constVoid } from 'fp-ts/lib/function'
import {
  playableMidiKeyboard,
  fromKeyBoardToMidiIdentifier,
  octaveKeyboardKey
} from './utils/fromKeyBoardToMidiIdentifier'
import { NoteContext } from './context'
import { Octaves } from './utils/baseFrequencyFromMidiNote'

const App: FC = () => {
  const { setNote, octave, setGate } = useContext(NoteContext)
  const octaveRef = useRef(octave)

  const handleKeyDown = (event: KeyboardEvent) => {
    event.stopImmediatePropagation()
    pipe(
      event.key.toLowerCase(),
      octaveKeyboardKey.decode,
      E.matchW(
        () =>
          pipe(
            event.key.toLowerCase(),
            playableMidiKeyboard.decode,
            E.matchW(constVoid, (key) => {
              setNote(fromKeyBoardToMidiIdentifier(key, octaveRef.current))
            })
          ),
        (key) => {
          octaveRef.current = (key === 'x' ? octaveRef.current + 1 : octaveRef.current - 1) as Octaves
        }
      )
    )
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    event.stopImmediatePropagation()
    setGate(0)
  }

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      handleKeyDown(event)
    })
    window.addEventListener('keyup', (e) => handleKeyUp(e))

    return () => {
      window.removeEventListener('keydown', (event) => {
        handleKeyDown(event)
      })
      window.removeEventListener('keyup', (e) => handleKeyUp(e))
    }
  }, [])

  return (
    <MIDI>
      <GridRack>
        <Modules />
      </GridRack>
    </MIDI>
  )
}

export default App
