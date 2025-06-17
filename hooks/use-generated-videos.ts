import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GeneratedVideo {
  id: number;
  type: "video";
  src: string;
  title: string;
  aspectRatio: string;
  duration: string;
  thumbnail?: string;
}

interface GeneratedVideosState {
  generatedVideos: GeneratedVideo[];
  addGeneratedVideo: (video: GeneratedVideo) => void;
}

export const useGeneratedVideos = create<GeneratedVideosState>()(
  persist(
    (set, get) => ({
      generatedVideos: [],
      addGeneratedVideo: (video) => {
        set((state) => ({ generatedVideos: [video, ...state.generatedVideos] }));
      },
    }),
    {
      name: "generated_videos",
      partialize: (state) => ({ generatedVideos: state.generatedVideos }),
    }
  )
); 