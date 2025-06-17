"use client"

import { Play } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import type { MediaItem } from "@/components/infinite-scroll-grid"

interface VideoCardProps {
  video: MediaItem
  onClick: (video: MediaItem) => void
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [duration, setDuration] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
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
    timeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {})
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
      setCurrentTime(0)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration
      if (!isNaN(videoDuration)) {
        setDuration(videoDuration)
      }
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const timeDisplay = isHovering
    ? `${formatTime(currentTime)} / ${formatTime(duration)}`
    : formatTime(duration)

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
        style={{ aspectRatio: video.aspectRatio === "16:9" ? "16/9" : video.aspectRatio === "9:16" ? "9/16" : "1/1" }}
        loop
        muted
        playsInline
        poster={video.thumbnail || video.src}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Overlay */}
      <div className={`media-overlay ${isHovering ? 'opacity-50' : ''}`} />

      {/* Play icon - only show when not hovering */}
      {!isHovering && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-80" />
        </div>
      )}

      {/* Duration badge with current time when playing */}
      {duration > 0 && (
        <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-sm text-white">
          {timeDisplay}
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