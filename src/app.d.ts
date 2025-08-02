declare type Difficulty = "easy" | "medium" | "hard"
declare type Problem = {
    id: string
    title: string
    tags: string[]
    isPremium?: boolean
}