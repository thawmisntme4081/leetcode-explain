import Section from '@/layouts/Section'
import { Card } from '../ui/card'

type Props = {
  loop: number | string
  loop2?: number | string
  maxLoop: number
  statusMessage: string
  result?: string
}

const ResultSection = ({
  loop,
  loop2,
  maxLoop,
  statusMessage,
  result,
}: Props) => {
  return (
    <Card>
      <Section title="Status & Results">
        <div className="mb-4">
          <p className="text-sm font-medium text-zinc-300">Loop Information:</p>
          <p className="text-xl font-bold font-mono">
            Iteration: {loop} / {maxLoop > 0 ? maxLoop : '-'}
          </p>
          {!!loop2 && (
            <p className="text-xl font-bold font-mono">
              Iteration: {loop2} / {maxLoop > 0 ? maxLoop : '-'}
            </p>
          )}
        </div>
        <p className="text-lg text-zinc-300 mb-4 font-mono">{statusMessage}</p>
        {result && (
          <p className="text-xl font-bold text-green-400">
            Solution Found! Result: {result}
          </p>
        )}
      </Section>
    </Card>
  )
}

export default ResultSection
