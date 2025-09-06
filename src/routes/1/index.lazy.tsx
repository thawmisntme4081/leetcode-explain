import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/1/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="text-white">
      <Link to="/1/1" className="block">
        Approach 1
      </Link>
      <Link to="/1/2" className="block">
        Approach 2
      </Link>
    </div>
  )
}
