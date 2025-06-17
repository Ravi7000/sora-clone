"use client"

import { MainLayout } from "@/components/main-layout"
import { InfiniteScrollGrid } from "@/components/infinite-scroll-grid"
import { GlassyOverlay } from "@/components/glassy-overlay"
import { useState, useEffect } from "react"
import type { MediaItem } from "@/components/infinite-scroll-grid"
import { useGeneratedImages } from "@/hooks/use-generated-images"

const initialImageData = [
  {
    id: 1,
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
    title: "Digital Art",
    aspectRatio: "3:2",
  },
  {
    id: 2,
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    title: "Portrait",
    aspectRatio: "2:3",
  },
  {
    id: 3,
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    title: "Landscape",
    aspectRatio: "4:3",
  },
  {
    id: 4,
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
    title: "Nature",
    aspectRatio: "3:2",
  }
]

export default function ImagesPage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem>(initialImageData[0])
  const [hydrated, setHydrated] = useState(false)
  const generatedImages = useGeneratedImages((s) => s.generatedImages)
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("2:3")

  useEffect(() => {
    setHydrated(true)
  }, [])

  const allImages = [...generatedImages, ...initialImageData]

  if (!hydrated) return null // or a loading spinner

  return (
    <MainLayout currentPage="Images">
      <div className="flex-1 min-h-0 relative">
        <InfiniteScrollGrid
          initialData={allImages}
          selectedMedia={selectedMedia}
          onSelectMedia={setSelectedMedia}
          contentType="image"
          selectedAspectRatio={selectedAspectRatio}
        />
        <GlassyOverlay
          selectedAspectRatio={selectedAspectRatio}
          setSelectedAspectRatio={setSelectedAspectRatio}
        />
      </div>
    </MainLayout>
  )
}
