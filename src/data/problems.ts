import easy from "@/data/easy.json"
import medium from "@/data/medium.json"
import hard from "@/data/hard.json"

const map = {
    easy,
    medium,
    hard,
}

export const getProblems = (difficulty: Difficulty) => map[difficulty]