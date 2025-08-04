import { cn } from '@/lib/utils'

type Props<K extends string | number, V> = {
  keyVal: K
  value: V
  foundPair: boolean
  isValid: boolean
}

const HashMapItem = <K extends string | number, V>({
  keyVal,
  value,
  foundPair,
  isValid,
}: Props<K, V>) => {
  return (
    <li
      className={cn(`
        flex items-center justify-between p-2 rounded-lg transition-all duration-300 ease-in-out
        ${foundPair ? 'bg-orange-300 scale-105 shadow-md' : 'bg-zinc-700'}
        ${isValid ? 'bg-green-400 scale-105 shadow-md' : ''}
    `)}
    >
      <span className="font-mono text-zinc-900 font-bold">{keyVal}</span>
      <span className="font-mono text-zinc-900 font-bold">{String(value)}</span>
    </li>
  )
}

export default HashMapItem
