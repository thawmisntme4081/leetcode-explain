import { useMemo, useState } from "react";

import { Lock, Search } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Problem {
  id: number;
  title: string;
  isPremium: boolean;
  tags: string[];
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    isPremium: false,
    tags: ["Array", "Hash Table"],
  },
  {
    id: 2,
    title: "Add Two Numbers",
    isPremium: false,
    tags: ["Linked List", "Math", "Recursion"],
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    isPremium: false,
    tags: ["Hash Table", "String", "Sliding Window"],
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    isPremium: false,
    tags: ["Array", "Binary Search", "Divide and Conquer"],
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    isPremium: false,
    tags: ["String", "Dynamic Programming"],
  },
  {
    id: 6,
    title: "Zigzag Conversion",
    isPremium: false,
    tags: ["String"],
  },
  {
    id: 7,
    title: "Reverse Integer",
    isPremium: false,
    tags: ["Math"],
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    isPremium: false,
    tags: ["String"],
  },
  {
    id: 9,
    title: "Palindrome Number",
    isPremium: false,
    tags: ["Math"],
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    isPremium: false,
    tags: ["String", "Dynamic Programming", "Recursion"],
  },
  {
    id: 156,
    title: "Binary Tree Upside Down",
    isPremium: true,
    tags: ["Tree", "Depth-First Search", "Binary Tree"],
  },
  {
    id: 159,
    title: "Longest Substring with At Most Two Distinct Characters",
    isPremium: true,
    tags: ["Hash Table", "String", "Sliding Window"],
  },
];

type Props = {
  difficulty: string;
};

export default function ProblemList({ difficulty }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesSearch;
    });
  }, [searchTerm]);

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-28">Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProblems.map((problem, index) => (
                <TableRow
                  key={problem.id}
                  className={`cursor-pointer ${index % 2 === 0 ? "bg-primary hover:bg-primary/80" : "bg-gray-300 hover:bg-gray-200"}`}
                >
                  <TableCell>{problem.id}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="hover:text-blue-600">
                          {problem.title}
                        </span>
                        {problem.isPremium && (
                          <Lock className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {problem.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
  );
}
