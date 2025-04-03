"use client"

import type React from "react"

import { MobileNavbar } from "@/components/mobile-navbar"
import { Sidebar } from "@/components/sidebar"
import { useMobile } from "@/hooks/use-mobile"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile()

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && <Sidebar />}
      <main className="flex-1">
        <div className="container max-w-screen-md mx-auto px-4 py-6">{children}</div>
      </main>
      {isMobile && <MobileNavbar />}
    </div>
  )
}

