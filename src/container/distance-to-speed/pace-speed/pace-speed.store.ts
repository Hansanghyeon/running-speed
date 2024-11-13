import React from 'react'
import { SetStateAction, atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { RESET, atomFamily, atomWithReset, useResetAtom } from 'jotai/utils'

type AtomKey = {
  atomKey?: string
}
type AtomType = {
  key: string
  value: {
    pace: {
      value1: string
      value2: string
    }
    speed: string
    acceleration: string
  }
}
const initValue = {
  pace: {
    value1: '0',
    value2: '0',
  },
  speed: '0',
  acceleration: '0',
}

const paceSpeedState = atomFamily(
  ({ key }: AtomType) => {
    const rat = atomWithReset<AtomType>({
      key,
      value: initValue,
    })

    const at = atom(
      (get) => get(rat).value,
      (_get, set, update: SetStateAction<AtomType['value']> | typeof RESET) => {
        if (update === RESET) {
          set(rat, RESET)
          return
        }
        if (typeof update === 'function') {
          set(rat, (prev) => {
            const v = update(prev.value)
            return { key, value: v }
          })
          return
        }
        set(rat, { key, value: update })
      }
    )
    at.debugLabel = key
    return at
  },
  (a, b) => a.key === b.key
)

export const usePaceSpeedAtom = {
  key: (p?: AtomKey) => `at:${p?.atomKey ?? ''}:pace-speed`,
  state: (p?: AtomKey) =>
    useAtom(
      React.useMemo(
        () =>
          paceSpeedState({
            key: usePaceSpeedAtom.key(p),
            value: initValue,
          }),
        [p]
      )
    ),
  get: (p?: AtomKey) =>
    useAtomValue(
      React.useMemo(
        () =>
          paceSpeedState({
            key: usePaceSpeedAtom.key(p),
            value: initValue,
          }),
        [p]
      )
    ),
  set: (p?: AtomKey) =>
    useSetAtom(
      React.useMemo(
        () =>
          paceSpeedState({
            key: usePaceSpeedAtom.key(p),
            value: initValue,
          }),
        [p]
      )
    ),
  reset: (p?: AtomKey) =>
    useResetAtom(
      React.useMemo(
        () =>
          paceSpeedState({
            key: usePaceSpeedAtom.key(p),
            value: initValue,
          }),
        [p]
      )
    ),
}
