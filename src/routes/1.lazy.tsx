import InputLabel from '@/components/common/InputLabel'
import ArraySection from '@/components/Sections/ArraySection'
import HashMapSection from '@/components/Sections/HashMapSection'
import InputSection from '@/components/Sections/InputSection'
import ResultSection from '@/components/Sections/ResultSection'
import { Card } from '@/components/ui/card'
import { useTwoSumStore } from '@/containers/1/1.store'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createLazyFileRoute('/1')({
  component: Problem1,
})

function Problem1() {
  const {
    numbersInput,
    targetInput,
    numbers,
    target,
    hashMap,
    result,
    currentIndex,
    diff,
    statusMessage,
    animationRunning,
    animationStep,
    set,
    reset,
    start,
  } = useTwoSumStore()

  useEffect(() => {
    if (!animationRunning) {
      if (currentIndex >= numbers.length && numbers.length > 0) {
        set('statusMessage', 'Loop finished. No pair found.')
      }
      return
    }

    if (result.length > 0) {
      set('animationRunning', false)
      return
    }

    const timer = setTimeout(() => {
      if (currentIndex >= numbers.length) {
        set('animationRunning', false)
        return
      }

      if (animationStep === 0) {
        const currentNum = numbers[currentIndex]
        const newDiff = target - currentNum
        set('diff', newDiff)
        set(
          'statusMessage',
          `Current number is ${currentNum} (at index ${currentIndex}). Calculating the difference: ${target} - ${currentNum} = ${newDiff}.`
        )
        set('animationStep', 1)
        return
      }
      if (animationStep === 1) {
        const newDiff = diff
        if (hashMap.hasOwnProperty(newDiff!)) {
          const firstIndex = hashMap[newDiff!]
          set('result', [firstIndex, currentIndex])
          set(
            'statusMessage',
            `Found the difference, ${newDiff}, in the hash map! The indices are [${firstIndex}, ${currentIndex}].`
          )
          set('animationRunning', false)
          return
        }
        set(
          'statusMessage',
          `The difference, ${newDiff}, is not in the hash map. Let's add the current number to the map.`
        )
        set('animationStep', 2)

        return
      }

      const currentNum = numbers[currentIndex]
      set('hashMap', { ...hashMap, [currentNum]: currentIndex })
      set(
        'statusMessage',
        `Adding ${currentNum}:${currentIndex} to the hash map. Moving to the next number.`
      )

      set('diff', null)
      set('animationStep', 0)
      set('currentIndex', currentIndex + 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [
    animationRunning,
    currentIndex,
    numbers,
    target,
    hashMap,
    diff,
    animationStep,
    result,
  ])

  return (
    <div className="max-w-3xl w-full grid gap-4">
      <InputSection
        onStart={start}
        onReset={reset}
        animationRunning={animationRunning}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputLabel
            id="numbers"
            label="Numbers (comma separated)"
            value={numbersInput}
            onChange={(value) => set('numbersInput', value)}
          />
          <InputLabel
            id="target"
            label="Target"
            value={targetInput}
            onChange={(value) => set('targetInput', value)}
          />
        </div>
      </InputSection>

      <Card className="grid grid-cols-2 gap-8">
        <ArraySection
          title="Numbers Array"
          items={numbers}
          foundPair={(index) => currentIndex === index}
          isValid={(index) => result.includes(index)}
        />

        <HashMapSection
          hashMap={hashMap}
          label="{ number: index }"
          foundPair={(key) => diff !== null && +key === diff}
          isValid={(value) => result.includes(value)}
        />
      </Card>

      <ResultSection
        loop={currentIndex + 1}
        maxLoop={numbers.length}
        statusMessage={statusMessage}
        result={result.length > 0 ? `[${result.join(', ')}]` : undefined}
      />
    </div>
  )
}
