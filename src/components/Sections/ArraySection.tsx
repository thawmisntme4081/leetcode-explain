import Section from '@/layouts/Section'
import { cn } from '@/lib/utils'

type Props<T> = {
  title: string
  foundPair: (index: number) => boolean
  isValid: (index: number) => boolean
  items: T[]
}

const ArraySection = <T,>({ title, items, foundPair, isValid }: Props<T>) => {
  return (
    <Section title={title}>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              `
                w-12 h-12 flex flex-col items-center justify-center rounded-lg
                transition-all duration-300 transform border border-zinc-600
                ${foundPair(index) ? 'bg-orange-500 text-zinc-950 scale-110 shadow-lg' : 'bg-zinc-800 text-white'}
                ${isValid(index) ? 'bg-green-400 text-zinc-950 scale-110 shadow-lg' : ''}
              `
            )}
          >
            <span className="text-lg font-semibold">{String(item)}</span>
            <span className="text-xs">[{index}]</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default ArraySection
