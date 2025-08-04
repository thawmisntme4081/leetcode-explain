import ProblemList from '@/containers/Homepage/ProblemList'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

const ITEMS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

function App() {
  return (
    <main className="flex justify-center p-5">
      <Card className="p-4 bg-card">
        <Tabs defaultValue={ITEMS[0].value} className="w-[700px]">
          <TabsList className="bg-primary">
            {ITEMS.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {ITEMS.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              <ProblemList difficulty={item.value as Difficulty} />
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </main>
  )
}
