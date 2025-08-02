import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/$problemId")({
  component: ProblemDetail,
})

function ProblemDetail() {
  const { problemId } = Route.useParams()

  return (
    <div>
      <p className="text-amber-100">{`Hello "/${problemId}"!`}</p>
    </div>
  )
}
