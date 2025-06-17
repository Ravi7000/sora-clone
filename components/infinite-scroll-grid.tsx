"use client"

import { Play } from "lucide-react"
import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import React from "react"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import Masonry from "react-masonry-css"

export interface MediaItem {
  id: number
  type: "video" | "image"
  src: string
  title: string
  aspectRatio: string
  duration?: string
}

interface InfiniteScrollGridProps {
  initialData: MediaItem[]
  selectedMedia: MediaItem
  onSelectMedia: (media: MediaItem) => void
  contentType?: "image" | "video"
  selectedAspectRatio?: string
}

export function InfiniteScrollGrid({
  initialData,
  selectedMedia,
  onSelectMedia,
  contentType = "image",
  selectedAspectRatio,
}: InfiniteScrollGridProps) {
  const [items, setItems] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const viewportRef = useRef<HTMLDivElement>(null)

  // Sample image URLs for variety
  const sampleImages = [
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop",
  ]

  const generateVideoTitles = () => {
    const videoTitles = [
      "Ocean Waves",
      "Mountain Sunset",
      "City Traffic",
      "Forest Walk",
      "Desert Storm",
      "Rain Dance",
      "Fire Show",
      "Snow Fall",
      "Beach Waves",
      "Night Sky",
      "River Flow",
      "Wind Turbines",
      "Lightning Strike",
      "Flower Bloom",
      "Bird Flight",
      "Waterfall",
      "Sunrise",
      "Clouds Moving",
      "Street Art",
      "Dancing",
    ]
    return videoTitles[Math.floor(Math.random() * videoTitles.length)]
  }

  const generateImageTitles = () => {
    const imageTitles = [
      "Abstract Art",
      "Digital Portrait",
      "Landscape View",
      "Urban Scene",
      "Nature Study",
      "Color Splash",
      "Geometric Design",
      "Artistic Vision",
      "Creative Expression",
      "Visual Art",
      "Modern Design",
      "Classic Style",
      "Contemporary Art",
      "Digital Creation",
      "Artistic Render",
      "Photo Study",
      "Light Play",
      "Shadow Work",
      "Texture Art",
      "Minimal Design",
    ]
    return imageTitles[Math.floor(Math.random() * imageTitles.length)]
  }

  const generateDuration = () => {
    const durations = ["0:08", "0:12", "0:15", "0:18", "0:22", "0:25", "0:30", "0:35", "0:42", "0:48"]
    return durations[Math.floor(Math.random() * durations.length)]
  }

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    console.log("Loading more items...", { currentCount: items.length, contentType })

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Generate more items based on content type
    const newItems: MediaItem[] = Array.from({ length: 8 }, (_, index) => {
      const randomImageIndex = Math.floor(Math.random() * sampleImages.length)
      return {
        id: items.length + index + 1,
        type: contentType,
        src: sampleImages[randomImageIndex],
        title: contentType === "video" ? generateVideoTitles() : generateImageTitles(),
        aspectRatio: ["3:2", "1:1", "2:3"][Math.floor(Math.random() * 3)],
        ...(contentType === "video" && { duration: generateDuration() }),
      }
    })

    console.log("Generated new items:", newItems.length)
    setItems((prev) => [...prev, ...newItems])
    setLoading(false)

    // Stop loading more after 100 items (for demo purposes)
    if (items.length + newItems.length >= 100) {
      setHasMore(false)
      console.log("Reached maximum items")
    }
  }, [loading, hasMore, items.length, contentType, sampleImages])

  useEffect(() => {
    const target = viewportRef.current
    if (!target) return

    const handleScroll = () => {
      const scrollTop = target.scrollTop
      const scrollHeight = target.scrollHeight
      const clientHeight = target.clientHeight
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 300
      
      if (scrolledToBottom && !loading && hasMore) {
        console.log("Scrolled to bottom, loading more...", {
          scrollTop,
          scrollHeight,
          clientHeight,
          scrolledToBottom
        })
        loadMoreItems()
      }
    }

    // Add scroll event listener to the ScrollArea.Viewport
    target.addEventListener("scroll", handleScroll)
    return () => {
      target.removeEventListener("scroll", handleScroll)
    }
  }, [loadMoreItems, loading, hasMore])

  // Memoize sorted items to prevent unnecessary re-sorting
  const sortedItems = useMemo(() => {
    if (!selectedAspectRatio) return items;
    return [...items].sort((a, b) => {
      if (a.aspectRatio === selectedAspectRatio && b.aspectRatio !== selectedAspectRatio) return -1;
      if (a.aspectRatio !== selectedAspectRatio && b.aspectRatio === selectedAspectRatio) return 1;
      return 0;
    });
  }, [items, selectedAspectRatio]);

  // Ensure we have at least 3 items for the featured layout
  const displayItems = sortedItems.length >= 3 ? sortedItems : [...sortedItems, ...initialData].slice(0, Math.max(3, sortedItems.length))

  return (
    <ScrollArea.Root className="flex-1 p-6 h-full w-full" type="scroll">
      <ScrollArea.Viewport
        className="h-[80vh] w-full overflow-auto"
        ref={viewportRef}
      >
        <Masonry
          breakpointCols={{ default: 3, 1400: 2, 900: 1 }}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="media-card-no-border group mb-4 cursor-pointer relative"
              onClick={() => onSelectMedia(item)}
            >
              <img
                src={item.src || "/placeholder.svg"}
                alt={item.title}
                className="w-full object-cover"
                style={{ aspectRatio: item.aspectRatio === "3:2" ? "3/2" : item.aspectRatio === "2:3" ? "2/3" : "1/1" }}
              />
              <div className="media-overlay" />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-80" />
                </div>
              )}
              {item.duration && (
                <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-sm">
                  {item.duration}
                </div>
              )}
              {item.title && (
                <div className="absolute bottom-4 left-4 text-white font-medium">{item.title}</div>
              )}
            </div>
          ))}
          {loading && (
            Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-[40rem] w-full mb-4" />
            ))
          )}
        </Masonry>
        {/* End of results */}
        {!hasMore && displayItems.length > 10 && (
          <div className="text-center py-8 text-white/60">
            <p>You've reached the end of the {contentType === "video" ? "videos" : "images"}</p>
            <p className="text-sm mt-2">Total loaded: {displayItems.length} items</p>
          </div>
        )}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" className="ScrollAreaScrollbar">
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal" className="ScrollAreaScrollbar">
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  )
}
