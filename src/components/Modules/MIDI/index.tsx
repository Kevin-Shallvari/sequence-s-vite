import { ReactNode, FC, useEffect, useState } from 'react'
import * as RD from '@devexperts/remote-data-ts'
import { WebMidi } from 'webmidi'
import { pipe } from 'fp-ts/lib/function'

export const MIDI: FC<{ children: ReactNode }> = ({ children }) => {
  const [midiState, setMidiState] = useState<RD.RemoteData<unknown, Record<string, string>>>(RD.pending)

  const enableMIDI = async () => {
    try {
      await WebMidi.enable()
      return setMidiState(RD.success({}))
    } catch (err) {
      return setMidiState(RD.failure(err))
    }
  }

  useEffect(() => {
    enableMIDI()
    return () => {
      WebMidi.disable()
    }
  }, [])

  return pipe(
    midiState,
    RD.fold3(
      () => <div>loading</div>,
      () => <div>error</div>,
      () => <div>{children}</div>
    )
  )
}
