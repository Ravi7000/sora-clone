"use client"

import { MainLayout } from "@/components/main-layout"
import { InfiniteScrollGrid } from "@/components/infinite-scroll-grid"
import { VideoGlassyOverlay } from "@/components/video-glassy-overlay"
import { useState } from "react"
import type { MediaItem } from "@/components/infinite-scroll-grid"

const initialVideoData = [
  {
    id: 1,
    type: "video" as const,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
    title: "junz2",
    aspectRatio: "3:2",
    duration: "0:15",
  },
  {
    id: 2,
    type: "video" as const,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    title: "Forest Cycling",
    aspectRatio: "2:3",
    duration: "0:12",
  },
  {
    id: 3,
    type: "video" as const,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    title: "City Lights",
    aspectRatio: "4:3",
    duration: "0:08",
  },
  {
    id: 4,
    type: "video" as const,
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop",
    title: "Ocean Waves",
    aspectRatio: "3:2",
    duration: "0:18",
  },
]

export default function VideosPage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem>(initialVideoData[0])

  return (
    <MainLayout currentPage="Videos">
      <div className="flex-1 min-h-0 relative">
        <InfiniteScrollGrid
          initialData={initialVideoData}
          selectedMedia={selectedMedia}
          onSelectMedia={setSelectedMedia}
          contentType="video"
        />
        <VideoGlassyOverlay />
      </div>
    </MainLayout>
  )
}
