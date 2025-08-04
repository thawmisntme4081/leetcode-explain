import { Link } from "@tanstack/react-router"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { Lock } from "lucide-react"
import { Badge } from "../../components/ui/badge"

type Props = {
  problems: Problem[]
}

const TableProblems = ({ problems }: Props) => {
  return (
    <Table className="mt-4">
      <TableHeader className="bg-gray-200">
        <TableRow>
          <TableHead className="w-16">Id</TableHead>
          <TableHead>Title</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.map((problem, index) => (
          <TableRow
            key={problem.id}
            className={
              index % 2 === 0
                ? "bg-primary hover:bg-primary/80"
                : "bg-gray-300 hover:bg-gray-200"
            }
          >
            <TableCell>{problem.id}</TableCell>
            <TableCell>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Link to={problem.id} className="hover:text-blue-600">
                    {problem.title}
                  </Link>
                  {problem.isPremium && (
                    <Lock className="w-4 h-4 text-orange-500" />
                  )}
                </div>
              </div>
              <div className="flex gap-1 mt-2">
                {problem.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableProblems
