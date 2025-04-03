import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for stories
const stories = [
  { id: 1, username: "johndoe", avatar: "/placeholder.svg?height=60&width=60" },
  { id: 2, username: "janedoe", avatar: "/placeholder.svg?height=60&width=60" },
  { id: 3, username: "mike_smith", avatar: "/placeholder.svg?height=60&width=60" },
  { id: 4, username: "sarah_j", avatar: "/placeholder.svg?height=60&width=60" },
  { id: 5, username: "alex_t", avatar: "/placeholder.svg?height=60&width=60" },
  { id: 6, username: "emma_w", avatar: "/placeholder.svg?height=60&width=60" },
  { id: 7, username: "james_b", avatar: "/placeholder.svg?height=60&width=60" },
  { id: 8, username: "lisa_m", avatar: "/placeholder.svg?height=60&width=60" },
]

export function Stories() {
  return (
    <div className="mb-6">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 p-2">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-1">
              <div className="rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
                <Avatar className="h-16 w-16 border-2 border-background">
                  <AvatarImage src={story.avatar} alt={story.username} />
                  <AvatarFallback>{story.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs">
                {story.username.length > 10 ? `${story.username.slice(0, 10)}...` : story.username}
              </span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

