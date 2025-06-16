"use client"

import type React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface MainLayoutProps {
  children: React.ReactNode
  currentPage: string
}

export function MainLayout({ children, currentPage }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar currentPage={currentPage} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header currentPage={currentPage} />
        <div className="flex-1 min-h-0 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
