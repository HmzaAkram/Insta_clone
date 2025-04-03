import Link from "next/link"
import { Home, Search, PlusSquare, Heart, User } from "lucide-react"

export function MobileNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-10">
      <div className="flex justify-around items-center h-16">
        <Link href="/" className="flex flex-col items-center justify-center">
          <Home className="h-6 w-6" />
        </Link>

        <Link href="/explore" className="flex flex-col items-center justify-center">
          <Search className="h-6 w-6" />
        </Link>

        <Link href="/create" className="flex flex-col items-center justify-center">
          <PlusSquare className="h-6 w-6" />
        </Link>

        <Link href="/notifications" className="flex flex-col items-center justify-center">
          <Heart className="h-6 w-6" />
        </Link>

        <Link href="/profile" className="flex flex-col items-center justify-center">
          <User className="h-6 w-6" />
        </Link>
      </div>
    </div>
  )
}

