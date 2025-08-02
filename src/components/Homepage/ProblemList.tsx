import { useMemo, useState } from "react"

import { Search } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"

import { getProblems } from "@/data/problems"
import TableProblems from "./TableProblems"

type Props = {
  difficulty: Difficulty
}

export default function ProblemList({ difficulty }: Props) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProblems = useMemo(() => {
    return getProblems(difficulty).filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      return matchesSearch
    })
  }, [searchTerm])

  return (
    <div className="mt-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 text-secondary"
        />
      </div>

      <Card className="mt-4 p-0 overflow-hidden">
        <CardContent className="p-0">
          <TableProblems problems={filteredProblems} />
        </CardContent>
      </Card>

      {filteredProblems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No problems found matching your search.
          </p>
        </div>
      )}
    </div>
  )
}
