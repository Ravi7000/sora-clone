"use client"
import { Play } from "lucide-react"

interface MediaItem {
  id: number
  type: "video" | "image"
  src: string
  title: string
  aspectRatio: string
  duration?: string
}

interface MediaGridProps {
  data: MediaItem[]
  selectedMedia: MediaItem
  onSelectMedia: (media: MediaItem) => void
}

export function MediaGrid({ data, selectedMedia, onSelectMedia }: MediaGridProps) {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="grid grid-cols-2 gap-4 h-96">
        {/* Featured large item */}
        <div className={`media-card-no-border group h-full cursor-pointer`} onClick={() => onSelectMedia(data[0])}>
          <img
            src={data[0]?.src || "/placeholder.svg?height=400&width=600"}
            alt={data[0]?.title || "Media"}
            className="w-full h-full object-cover"
          />
          <div className="media-overlay" />
          {data[0]?.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-12 h-12 text-white opacity-80" />
            </div>
          )}
          {data[0]?.duration && (
            <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-sm">{data[0].duration}</div>
          )}
          {data[0]?.title && <div className="absolute bottom-4 left-4 text-white font-medium">{data[0].title}</div>}
        </div>

        {/* Right column with smaller items */}
        <div className="grid grid-rows-2 gap-4 h-full">
          {data.slice(1, 3).map((item) => (
            <div
              key={item.id}
              className={`media-card-no-border group h-full cursor-pointer`}
              onClick={() => onSelectMedia(item)}
            >
              <img
                src={item.src || "/placeholder.svg?height=200&width=300"}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="media-overlay" />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white opacity-80" />
                </div>
              )}
              {item.duration && (
                <div className="absolute bottom-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-xs">
                  {item.duration}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
