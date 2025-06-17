import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GeneratedImage {
  id: number;
  type: "image";
  src: string;
  title: string;
  aspectRatio: string;
}

interface GeneratedImagesState {
  generatedImages: GeneratedImage[];
  addGeneratedImage: (img: GeneratedImage) => void;
}

export const useGeneratedImages = create<GeneratedImagesState>()(
  persist(
    (set, get) => ({
      generatedImages: [],
      addGeneratedImage: (img) => {
        set((state) => ({ generatedImages: [img, ...state.generatedImages] }));
      },
    }),
    {
      name: "generated_images",
      partialize: (state) => ({ generatedImages: state.generatedImages }),
    }
  )
); 