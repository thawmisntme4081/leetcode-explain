import InputLabel from '@/components/common/InputLabel'
import ArraySection from '@/components/Sections/ArraySection'
import InputSection from '@/components/Sections/InputSection'
import ResultSection from '@/components/Sections/ResultSection'
import { Card } from '@/components/ui/card'
import { useTitle } from '@/hooks/useTitle.hook'
import { useTwoSumStore } from '@/store/1/bruteForce.store'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createLazyFileRoute('/1/1')({
  component: Problem1BruteForce,
})

function Problem1BruteForce() {
  const {
    numbersInput,
    targetInput,
    numbers,
    target,
    result,
    iIndex,
    jIndex,
    statusMessage,
    animationRunning,
    setValue,
    reset,
    start,
  } = useTwoSumStore()

  useTitle('Two Sum Brute Force')

  useEffect(() => {
    if (iIndex === -1 || jIndex === -1) {
      setValue('statusMessage', 'Ready to start the animation.')
      return
    }

    if (jIndex >= numbers.length) {
      setValue(
        'statusMessage',
        `Inner loop for i=${iIndex} finished. Moving to next outer loop iteration.`
      )
    } else {
      const sum = numbers[iIndex] + numbers[jIndex]
      if (sum === target) {
        setValue(
          'statusMessage',
          `Found a match! ${numbers[iIndex]} + ${numbers[jIndex]} = ${target}. Indices are [${iIndex}, ${jIndex}].`
        )
      } else {
        setValue(
          'statusMessage',
          `Checking sum of ${numbers[iIndex]} and ${numbers[jIndex]}. Sum is ${sum}. No match.`
        )
      }
    }
  }, [iIndex, jIndex, numbers, target, setValue])

  useEffect(() => {
    if (!animationRunning) {
      if (
        iIndex >= numbers.length - 1 &&
        numbers.length > 0 &&
        result.length === 0
      ) {
        setValue('statusMessage', 'No pair found.')
      }
      return
    }

    if (result.length > 0) {
      setValue('animationRunning', false)
      return
    }

    const timer = setTimeout(() => {
      if (iIndex >= numbers.length - 1) {
        setValue('animationRunning', false)
        return
      }

      if (jIndex >= numbers.length) {
        setValue('iIndex', iIndex + 1)
        setValue('jIndex', iIndex + 2)
        return
      }

      // Logic for the inner loop
      if (numbers[iIndex] + numbers[jIndex] === target) {
        setValue('result', [iIndex, jIndex])
      } else {
        setValue('jIndex', jIndex + 1)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [animationRunning, iIndex, jIndex, numbers, target, result])

  return (
    <div className="max-w-3xl w-full grid gap-4 p-4">
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
            onChange={(value) => setValue('numbersInput', value)}
          />
          <InputLabel
            id="target"
            label="Target"
            value={targetInput}
            onChange={(value) => setValue('targetInput', value)}
          />
        </div>
      </InputSection>

      <Card className="grid grid-cols-2 gap-8">
        <ArraySection
          title="Numbers Array"
          items={numbers}
          foundPair={(index) => iIndex === index || jIndex === index}
          isValid={(index) => result.includes(index)}
        />
      </Card>

      <ResultSection
        loop={iIndex > -1 ? iIndex + 1 : '-'}
        loop2={jIndex > numbers.length - 1 ? jIndex - 1 : jIndex}
        maxLoop={numbers.length - 1}
        statusMessage={statusMessage}
        result={result.length > 0 ? `[${result.join(', ')}]` : undefined}
      />
    </div>
  )
}
