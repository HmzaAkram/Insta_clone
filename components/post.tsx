import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface PostProps {
  post: {
    id: number
    user: {
      id: number
      username: string
      avatar: string
    }
    image: string
    caption: string
    likes: number
    comments: number
    createdAt: string
  }
}

export function Post({ post }: PostProps) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

  return (
    <Card className="border rounded-md overflow-hidden">
      <CardHeader className="p-4 flex flex-row items-center space-x-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={post.user.avatar} alt={post.user.username} />
          <AvatarFallback>{post.user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-1">
          <Link href={`/profile/${post.user.username}`} className="font-semibold text-sm">
            {post.user.username}
          </Link>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative aspect-square w-full">
          <Image src={post.image || "/placeholder.svg"} alt={post.caption} fill className="object-cover" />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start p-4 space-y-3">
        <div className="flex justify-between w-full">
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <Heart className="h-6 w-6" />
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MessageCircle className="h-6 w-6" />
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <Send className="h-6 w-6" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Bookmark className="h-6 w-6" />
          </Button>
        </div>

        <div className="text-sm font-semibold">{post.likes} likes</div>

        <div className="text-sm">
          <Link href={`/profile/${post.user.username}`} className="font-semibold mr-2">
            {post.user.username}
          </Link>
          {post.caption}
        </div>

        <Link href={`/post/${post.id}`} className="text-sm text-muted-foreground">
          View all {post.comments} comments
        </Link>

        <div className="text-xs text-muted-foreground">{timeAgo}</div>
      </CardFooter>
    </Card>
  )
}

