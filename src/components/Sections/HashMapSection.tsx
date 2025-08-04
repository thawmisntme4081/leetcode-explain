import Section from '@/layouts/Section'
import HashMapItem from '../common/HashMapItem'

type Props<K extends string | number, V> = {
  hashMap: Record<K, V>
  label: string
  foundPair: (key: K) => boolean
  isValid: (value: V) => boolean
}

const HashMapSection = <K extends string | number, V>({
  hashMap,
  label,
  foundPair,
  isValid,
}: Props<K, V>) => {
  return (
    <Section title="Hash Map" subtitle={label}>
      <div className="min-h-[100px] bg-zinc-800 p-4 rounded-lg shadow-inner flex flex-col gap-2 transition-all duration-300">
        {Object.keys(hashMap).length > 0 ? (
          <ul className="list-none p-0 space-y-1">
            {Object.entries(hashMap).map(([key, value]) => (
              <HashMapItem
                key={key}
                keyVal={key}
                value={value}
                foundPair={foundPair(key as K)}
                isValid={isValid(value as V)}
              />
            ))}
          </ul>
        ) : (
          <p className="text-zinc-500 text-center italic mt-4">
            The hash map is empty.
          </p>
        )}
      </div>
    </Section>
  )
}

export default HashMapSection
