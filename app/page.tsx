import { Feed } from "@/components/feed"
import { MainLayout } from "@/components/layouts/main-layout"

export default function HomePage() {
  // In a real app, you would check if the user is authenticated
  // const isAuthenticated = ...
  // if (!isAuthenticated) redirect('/login');

  return (
    <MainLayout>
      <Feed />
    </MainLayout>
  )
}

