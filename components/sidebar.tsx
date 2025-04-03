import Link from "next/link"
import { Home, Search, Compass, MessageCircle, Heart, PlusSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <div className="w-64 border-r h-screen p-4 fixed left-0 top-0">
      <div className="flex flex-col h-full">
        <div className="py-6">
          <h1 className="text-2xl font-bold">Instagram</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Home
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/explore">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/explore">
              <Compass className="mr-2 h-5 w-5" />
              Explore
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/messages">
              <MessageCircle className="mr-2 h-5 w-5" />
              Messages
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/notifications">
              <Heart className="mr-2 h-5 w-5" />
              Notifications
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/create">
              <PlusSquare className="mr-2 h-5 w-5" />
              Create
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/profile">
              <User className="mr-2 h-5 w-5" />
              Profile
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  )
}

