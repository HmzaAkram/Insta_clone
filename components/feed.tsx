import { Post } from "@/components/post"
import { Stories } from "@/components/stories"

// Mock data for posts
const posts = [
  {
    id: 1,
    user: {
      id: 1,
      username: "johndoe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=600&width=600",
    caption: "Beautiful sunset at the beach! #sunset #beach #vacation",
    likes: 124,
    comments: 23,
    createdAt: "2023-04-15T12:00:00Z",
  },
  {
    id: 2,
    user: {
      id: 2,
      username: "janedoe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=600&width=600",
    caption: "Delicious homemade pasta for dinner tonight! #food #pasta #homemade",
    likes: 89,
    comments: 12,
    createdAt: "2023-04-14T18:30:00Z",
  },
]

export function Feed() {
  return (
    <div className="space-y-6">
      <Stories />

      <div className="space-y-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

