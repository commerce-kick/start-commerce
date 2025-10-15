import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_search-layout/search/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/search/_search-layout/"!</div>
}
