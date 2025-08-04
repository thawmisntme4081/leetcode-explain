import type { ReactNode } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

type Props = {
  children: ReactNode
  onStart: () => void
  onReset: () => void
  animationRunning: boolean
}

const InputSection = ({
  children,
  onStart,
  onReset,
  animationRunning,
}: Props) => {
  return (
    <Card>
      <div className="grid gap-4">{children}</div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={onStart}
          disabled={animationRunning}
          className={`
            ${
              animationRunning
                ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                : 'bg-orange-500 text-zinc-900 hover:bg-orange-600 shadow-md'
            }`}
        >
          Start Animation
        </Button>
        <Button variant="secondary" onClick={onReset}>
          Reset
        </Button>
      </div>
    </Card>
  )
}

export default InputSection
