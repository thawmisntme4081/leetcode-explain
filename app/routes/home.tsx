import ProblemList from "~/components/ProblemList";
import type { Route } from "./+types/home";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Leetcode Explanation" },
    { name: "description", content: "Leetcode Explanation Summary" },
  ];
}

const ITEMS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export default function Home() {
  return (
    <main className="flex justify-center p-5">
      <Tabs defaultValue={ITEMS[0].value} className="w-[700px]">
        <TabsList>
          {ITEMS.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {ITEMS.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            <ProblemList difficulty={item.value} />
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
