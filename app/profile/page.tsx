import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MainLayout } from "@/components/layouts/main-layout"
import { Grid, Settings } from "lucide-react"

// Mock user data
const user = {
  username: "johndoe",
  fullName: "John Doe",
  avatar: "/placeholder.svg?height=150&width=150",
  posts: 42,
  followers: 1024,
  following: 256,
  bio: "Photographer | Traveler | Food Lover\nBased in New York City",
}

// Mock posts data
const posts = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  image: `/placeholder.svg?height=300&width=300`,
}))

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative h-24 w-24 md:h-36 md:w-36">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.username}
              fill
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 className="text-xl font-semibold">{user.username}</h1>
              <div className="flex gap-2">
                <Button size="sm">Edit Profile</Button>
                <Button size="sm" variant="ghost">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-6 mb-4">
              <div className="text-center">
                <span className="font-semibold">{user.posts}</span> <span className="text-sm">posts</span>
              </div>
              <div className="text-center">
                <span className="font-semibold">{user.followers}</span> <span className="text-sm">followers</span>
              </div>
              <div className="text-center">
                <span className="font-semibold">{user.following}</span> <span className="text-sm">following</span>
              </div>
            </div>

            <div>
              <h2 className="font-semibold">{user.fullName}</h2>
              <p className="whitespace-pre-line text-sm">{user.bio}</p>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <Grid className="h-4 w-4" />
              <span className="hidden sm:inline">Posts</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div key={post.id} className="relative aspect-square">
                  <Image src={post.image || "/placeholder.svg"} alt={`Post ${post.id}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">Only you can see what you've saved</h3>
              <p className="text-muted-foreground">When you save something, it'll show up here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

