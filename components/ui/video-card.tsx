"use client"

import { Play } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import type { MediaItem } from "@/components/infinite-scroll-grid"

interface VideoCardProps {
  video: MediaItem
  onClick: (video: MediaItem) => void
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovering(true)
    // Add a small delay before playing to avoid playing on quick hover passes
    timeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Handle autoplay failure silently
        })
      }
    }, 200)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className="media-card-no-border group mb-4 cursor-pointer relative overflow-hidden"
      onClick={() => onClick(video)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={video.src}
        className="w-full object-cover"
        style={{ aspectRatio: video.aspectRatio === "3:2" ? "3/2" : video.aspectRatio === "2:3" ? "2/3" : "1/1" }}
        loop
        muted
        playsInline
        poster={video.thumbnail || video.src}
      />

      {/* Overlay */}
      <div className={`media-overlay ${isHovering ? 'opacity-50' : ''}`} />

      {/* Play icon - only show when not hovering */}
      {!isHovering && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-80" />
        </div>
      )}

      {/* Duration badge */}
      {video.duration && (
        <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-sm text-white">
          {video.duration}
        </div>
      )}

      {/* Title */}
      {video.title && (
        <div className="absolute bottom-4 left-4 text-white font-medium">
          {video.title}
        </div>
      )}
    </div>
  )
} 