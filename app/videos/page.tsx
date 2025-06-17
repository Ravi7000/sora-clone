"use client"

import { MainLayout } from "@/components/main-layout"
import { InfiniteScrollGrid } from "@/components/infinite-scroll-grid"
import { VideoGlassyOverlay } from "@/components/video-glassy-overlay"
import { useState, useEffect } from "react"
import type { MediaItem } from "@/components/infinite-scroll-grid"
import { useGeneratedVideos } from "@/hooks/use-generated-videos"

const initialVideoData = [
  {
    id: 1,
    type: "video" as const,
    src: "https://videos.pexels.com/video-files/32320635/13785801_1440_2560_24fps.mp4",
    thumbnail: "https://img.freepik.com/free-photo/close-up-shot-video-graphic-editor-using-specialized-software-edit-movie-footage-improve-visual-quality-professional-videographer-sitting-multi-monitor-workstation-enhancing-film-frames_482257-43894.jpg?ga=GA1.1.398567908.1750054778&semt=ais_hybrid&w=740",
    title: "Black Cat Walking",
    aspectRatio: "16:9",
    duration: "0:15",
  },
  {
    id: 2,
    type: "video" as const,
    src: "https://videos.pexels.com/video-files/30027084/12882441_360_640_25fps.mp4",
    thumbnail: "https://img.freepik.com/free-photo/close-up-shot-video-graphic-editor-using-specialized-software-edit-movie-footage-improve-visual-quality-professional-videographer-sitting-multi-monitor-workstation-enhancing-film-frames_482257-43894.jpg?ga=GA1.1.398567908.1750054778&semt=ais_hybrid&w=740",
    title: "Astronaut in Space",
    aspectRatio: "16:9",
    duration: "0:12",
  },
  {
    id: 3,
    type: "video" as const,
    src: "https://videos.pexels.com/video-files/6535266/6535266-sd_506_960_30fps.mp4",
    thumbnail: "https://img.freepik.com/free-photo/close-up-shot-video-graphic-editor-using-specialized-software-edit-movie-footage-improve-visual-quality-professional-videographer-sitting-multi-monitor-workstation-enhancing-film-frames_482257-43894.jpg?ga=GA1.1.398567908.1750054778&semt=ais_hybrid&w=740",
    title: "Camera Movement",
    aspectRatio: "16:9",
    duration: "0:08",
  },
  {
    id: 4,
    type: "video" as const,
    src: "https://videos.pexels.com/video-files/32578182/13891524_640_360_30fps.mp4",
    thumbnail: "https://img.freepik.com/free-photo/close-up-shot-video-graphic-editor-using-specialized-software-edit-movie-footage-improve-visual-quality-professional-videographer-sitting-multi-monitor-workstation-enhancing-film-frames_482257-43894.jpg?ga=GA1.1.398567908.1750054778&semt=ais_hybrid&w=740",
    title: "Dog Running",
    aspectRatio: "16:9",
    duration: "0:18",
  },
]

export default function VideosPage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem>(initialVideoData[0])
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("16:9")
  const [hydrated, setHydrated] = useState(false)
  const generatedVideos = useGeneratedVideos((s) => s.generatedVideos)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const allVideos = [...generatedVideos, ...initialVideoData]

  if (!hydrated) return null // or a loading spinner

  return (
    <MainLayout currentPage="Videos">
      <div className="flex-1 min-h-0 relative">
        <InfiniteScrollGrid
          initialData={allVideos}
          selectedMedia={selectedMedia}
          onSelectMedia={setSelectedMedia}
          contentType="video"
          selectedAspectRatio={selectedAspectRatio}
        />
        <VideoGlassyOverlay
          selectedAspectRatio={selectedAspectRatio}
          setSelectedAspectRatio={setSelectedAspectRatio}
        />
      </div>
    </MainLayout>
  )
}
