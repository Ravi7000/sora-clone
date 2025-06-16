import { create } from "zustand";

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
  hydrateFromLocalStorage: () => void;
}

const GENERATED_IMAGES_KEY = "generated_images";

export const useGeneratedImages = create<GeneratedImagesState>((set) => ({
  generatedImages: [],
  addGeneratedImage: (img) => {
    set((state) => {
      const updated = [img, ...state.generatedImages];
      if (typeof window !== "undefined") {
        window.localStorage.setItem(GENERATED_IMAGES_KEY, JSON.stringify(updated));
      }
      return { generatedImages: updated };
    });
  },
  hydrateFromLocalStorage: () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem(GENERATED_IMAGES_KEY);
      set({ generatedImages: data ? JSON.parse(data) : [] });
    }
  },
})); 