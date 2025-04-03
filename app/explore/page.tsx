import Image from "next/image"
import { MainLayout } from "@/components/layouts/main-layout"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock explore posts data
const explorePosts = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  image: `/placeholder.svg?height=${300 + (i % 3) * 50}&width=${300 + (i % 3) * 50}`,
}))

export default function ExplorePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-10" />
        </div>

        <div className="grid grid-cols-3 gap-1">
          {explorePosts.map((post) => (
            <div key={post.id} className="relative aspect-square">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={`Explore post ${post.id}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

