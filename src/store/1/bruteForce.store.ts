import { create } from 'zustand'

type State = {
  numbersInput: string
  targetInput: string
  numbers: number[]
  target: number
  result: number[]
  iIndex: number
  jIndex: number
  statusMessage: string
  animationRunning: boolean
  setValue: <K extends keyof State>(key: K, value: State[K]) => void
  parseInputs: () => { parsedNumbers: number[]; parsedTarget: number }
  reset: () => void
  start: () => void
}

export const useTwoSumStore = create<State>((set, get) => ({
  numbersInput: "2, 7, 11, 15",
  targetInput: "26",
  numbers: [],
  target: 0,
  result: [],
  iIndex: -1,
  jIndex: -1,
  statusMessage: "Ready to start the animation.",
  animationRunning: false,
  setValue: (key, value) => set({ [key]: value }),
  parseInputs: () => {
    const parsedNumbers = get().numbersInput
      .split(",")
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n))
    const parsedTarget = parseInt(get().targetInput, 10)
    set({ numbers: parsedNumbers, target: parsedTarget })
    return { parsedNumbers, parsedTarget }
  },
  reset: () =>
    set({
      animationRunning: false,
      numbers: [],
      target: 0,
      result: [],
      iIndex: -1,
      jIndex: -1,
      statusMessage: "Ready to start the animation.",
    }),
  start: () => {
    get().parseInputs()
    set({
      animationRunning: true,
      iIndex: 0,
      jIndex: 1,
      result: [],
      statusMessage: "Starting animation...",
    })
  },
}))
