import { create } from 'zustand'

type State = {
  wordInput: string
  word: string[]
  posNum: number
  currentIndex: number
  statusMessage: string
  animationRunning: boolean
  result: string
  set: <K extends keyof State>(key: K, value: State[K]) => void
  reset: () => void
  start: () => void
}

export const useCountCharRepeatStore = create<State>((set, get) => ({
  wordInput: "abbbcccc",
  word: [],
  posNum: 1,
  currentIndex: 0,
  statusMessage: "Ready to start the animation.",
  animationRunning: false,
  result: '',
  set: (key, value) => set({ [key]: value } as any),
  reset: () =>
    set({
      animationRunning: false,
      word: [],
      posNum: 1,
      currentIndex: 0,
      result: '',
      statusMessage: "Ready to start the animation.",
    }),
  start: () => {
    if (get().wordInput.length === 0) {
      set({ statusMessage: 'Please enter a word to start.' })
      return
    }
    const parsedWord = get().wordInput.split('');
    set({
      animationRunning: true,
      word: parsedWord,
      posNum: 1,
      currentIndex: 0,
      result: '',
      statusMessage: "Starting animation...",
    })
  },
}))
