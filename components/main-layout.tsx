"use client"

import type React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { useState } from "react"
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet"

interface MainLayoutProps {
  children: React.ReactNode
  currentPage: string
}

export function MainLayout({ children, currentPage }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar: hidden on mobile, flex on md+ */}
      <div className="hidden md:flex h-full">
        <Sidebar currentPage={currentPage} />
      </div>
      {/* Mobile Drawer Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-black border-r border-gray-800">
          <SheetClose asChild>
            <button className="absolute top-4 right-4 p-2 text-white/60 hover:text-white" aria-label="Close sidebar">✕</button>
          </SheetClose>
          <Sidebar currentPage={currentPage} />
        </SheetContent>
      </Sheet>
      <div className="flex-1 flex flex-col min-w-0">
        <Header currentPage={currentPage} onOpenSidebar={() => setSidebarOpen(true)} />
        <div className="flex-1 min-h-0 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
