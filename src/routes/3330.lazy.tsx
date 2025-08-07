import { createLazyFileRoute } from '@tanstack/react-router'

import { Card } from '@/components/ui/card'
import InputSection from '@/components/Sections/InputSection'
import InputLabel from '@/components/common/InputLabel'
import ArraySection from '@/components/Sections/ArraySection'
import ResultSection from '@/components/Sections/ResultSection'
import { useEffect } from 'react'
import { useCountCharRepeatStore } from '@/store/3330.store'

export const Route = createLazyFileRoute('/3330')({
  component: Problem3330,
})

function Problem3330() {
  const {
    animationRunning,
    currentIndex,
    word,
    wordInput,
    posNum,
    statusMessage,
    result,
    set,
    start,
    reset,
  } = useCountCharRepeatStore()

  useEffect(() => {
    let timerReset: NodeJS.Timeout
    if (!animationRunning || currentIndex >= word.length - 2) {
      if (currentIndex >= word.length - 2 && animationRunning) {
        set('animationRunning', false)
        timerReset = setTimeout(() => {
          set('result', `${posNum}`)
        }, 1000)
      }
      return
    }

    const timer = setTimeout(() => {
      const char1 = word[currentIndex]
      const char2 = word[currentIndex + 1]

      if (char1 === char2) {
        set('posNum', posNum + 1)
        set(
          'statusMessage',
          `Comparing '${char1}' and '${char2}'. They are the same! The count is incremented to ${posNum + 1}.`
        )
      } else {
        set(
          'statusMessage',
          `Comparing '${char1}' and '${char2}'. They are different. The count remains ${posNum}.`
        )
      }
      set('currentIndex', currentIndex + 1)
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearTimeout(timerReset)
    }
  }, [animationRunning, currentIndex, word, posNum])

  return (
    <div className="max-w-3xl w-full grid gap-4 p-4">
      <InputSection
        onStart={start}
        onReset={reset}
        animationRunning={animationRunning}
      >
        <InputLabel
          id="word"
          label="Enter a word"
          value={wordInput}
          onChange={(value) => set('wordInput', value)}
        />
      </InputSection>

      <Card>
        <ArraySection
          title="Word"
          items={word}
          foundPair={(index) =>
            index === currentIndex || index === currentIndex + 1
          }
          isValid={(index) =>
            (index === currentIndex || index === currentIndex + 1) &&
            word[currentIndex] === word[currentIndex + 1]
          }
        />
      </Card>

      <ResultSection
        loop={currentIndex}
        maxLoop={word.length - 2}
        statusMessage={statusMessage}
        result={result}
      />
    </div>
  )
}
