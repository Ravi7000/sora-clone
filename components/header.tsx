"use client"

import { Bell, MessageCircle } from "lucide-react"

interface HeaderProps {
  currentPage: string
  onOpenSidebar?: () => void
}

export function Header({ currentPage, onOpenSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        {onOpenSidebar && (
          <button
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={onOpenSidebar}
            aria-label="Open sidebar"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        )}
        <h1 className="text-xl font-medium">{currentPage}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
