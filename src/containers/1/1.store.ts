import { create } from 'zustand'

type State = {
  numbersInput: string
  targetInput: string
  numbers: number[]
  target: number
  hashMap: { [key: number]: number }
  result: number[]
  currentIndex: number
  diff: number | null
  statusMessage: string
  animationRunning: boolean
  animationStep: number
  set: <K extends keyof State>(key: K, value: State[K]) => void
  parseInputs: () => { parsedNums: number[]; parsedTarget: number }
  reset: () => void
  start: () => void
}

export const useTwoSumStore = create<State>((set, get) => ({
  numbersInput: "2, 7, 11, 15",
  targetInput: "9",
  numbers: [],
  target: 0,
  hashMap: {},
  result: [],
  currentIndex: -1,
  diff: null,
  statusMessage: "Ready to start the animation.",
  animationRunning: false,
  animationStep: 0,
  set: (key, value) => set({ [key]: value } as any),
  parseInputs: () => {
    const parsedNums = get().numbersInput
      .split(",")
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n))
    const parsedTarget = parseInt(get().targetInput, 10)
    set({ numbers: parsedNums, target: parsedTarget })
    return { parsedNums, parsedTarget }
  },
  reset: () =>
    set({
      animationRunning: false,
      numbers: [],
      target: 0,
      hashMap: {},
      result: [],
      currentIndex: -1,
      diff: null,
      statusMessage: "Ready to start the animation.",
      animationStep: 0,
    }),
  start: () => {
    get().parseInputs()
    set({
      animationRunning: true,
      animationStep: 0,
      currentIndex: 0,
      hashMap: {},
      result: [],
      statusMessage: "Starting animation...",
    })
  },
}))
