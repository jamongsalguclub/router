import { Link, createFileRoute } from '@tanstack/solid-router'
import { CustomMessage } from '~/components/CustomMessage'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div class="p-2">
      <h3>Welcome Home!!!</h3>
      <CustomMessage message="Hello from a custom component!" />
      <div class="mt-4">
        <Link
          to="/대한민국"
          class="block mt-2 p-2 bg-blue-500 text-white rounded"
          data-testid="korean-link"
        >
          Go to 대한민국
        </Link>
      </div>
    </div>
  )
}
