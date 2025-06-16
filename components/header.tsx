"use client"

import { Bell, MessageCircle } from "lucide-react"

interface HeaderProps {
  currentPage: string
}

export function Header({ currentPage }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
      <h1 className="text-xl font-medium">{currentPage}</h1>
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <MessageCircle className="w-5 h-5 text-orange-500" />
        </button>
      </div>
    </header>
  )
}
