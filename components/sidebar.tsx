"use client"

import {
  Search,
  Compass,
  ImageIcon,
  Video,
  TrendingUp,
  Heart,
  Upload,
  Trash2,
  FolderPlus,
  Folder,
  Sparkles,
  X,
} from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

interface SidebarProps {
  currentPage: string
}

export function Sidebar({ currentPage }: SidebarProps) {
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setShowSearch(true)
      }
      if (e.key === "Escape") {
        setShowSearch(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const mainItems = [
    { icon: Search, label: "Search", shortcut: "Ctrl K", href: "#", isSearch: true },
    { icon: Compass, label: "Explore", href: "#" },
    { icon: ImageIcon, label: "Images", href: "/images" },
    { icon: Video, label: "Videos", href: "/videos" },
    { icon: TrendingUp, label: "Top", href: "#" },
    { icon: Heart, label: "Likes", href: "#" },
  ]

  const libraryItems = [
    { icon: Upload, label: "My media", href: "#" },
    { icon: Heart, label: "Favorites", href: "#" },
    { icon: Upload, label: "Uploads", href: "#" },
    { icon: Trash2, label: "Trash", href: "#" },
    { icon: FolderPlus, label: "New folder", href: "#" },
    { icon: Folder, label: "Untitled folder", href: "#" },
  ]

  const handleItemClick = (item: any) => {
    if (item.isSearch) {
      setShowSearch(true)
    }
  }

  return (
    <>
      <aside className="w-64 bg-black border-r border-gray-800 flex flex-col h-full flex-shrink-0">
        <div className="p-4 flex-1">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            {mainItems.map((item) =>
              item.isSearch ? (
                <div key={item.label} onClick={() => handleItemClick(item)}>
                  <div className={`sidebar-item ${currentPage === item.label ? "active" : ""}`}>
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.shortcut && <span className="text-xs text-gray-500">{item.shortcut}</span>}
                  </div>
                </div>
              ) : (
                <Link key={item.label} href={item.href}>
                  <div className={`sidebar-item ${currentPage === item.label ? "active" : ""}`}>
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.shortcut && <span className="text-xs text-gray-500">{item.shortcut}</span>}
                  </div>
                </Link>
              ),
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Library</h3>
            <div className="space-y-1">
              {libraryItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <div className="sidebar-item">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="glassy-container rounded-2xl p-4 w-full max-w-2xl mx-4">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-white/60" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search images, videos, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-lg"
              />
              <button
                onClick={() => setShowSearch(false)}
                className="p-1 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {searchQuery && (
              <div className="border-t border-white/10 pt-4">
                <div className="text-white/60 text-sm mb-2">Search results for "{searchQuery}"</div>
                <div className="space-y-2">
                  <div className="p-2 hover:bg-white/10 rounded-lg cursor-pointer text-white">
                    <div className="font-medium">Digital Art Collection</div>
                    <div className="text-sm text-white/60">Images • 24 results</div>
                  </div>
                  <div className="p-2 hover:bg-white/10 rounded-lg cursor-pointer text-white">
                    <div className="font-medium">Abstract Videos</div>
                    <div className="text-sm text-white/60">Videos • 12 results</div>
                  </div>
                  <div className="p-2 hover:bg-white/10 rounded-lg cursor-pointer text-white">
                    <div className="font-medium">Ocean Scenes</div>
                    <div className="text-sm text-white/60">Mixed • 8 results</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
