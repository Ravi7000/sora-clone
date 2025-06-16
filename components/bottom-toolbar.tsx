"use client"

import { Plus, ImageIcon, FileText, HelpCircle, ArrowUp, Wand2, Camera } from "lucide-react"
import { useState } from "react"

interface MediaItem {
  id: number
  type: "video" | "image"
  src: string
  title: string
  aspectRatio: string
  duration?: string
}

interface BottomToolbarProps {
  selectedMedia: MediaItem
  aspectRatio: string
  onAspectRatioChange: (ratio: string) => void
}

export function BottomToolbar({ selectedMedia, aspectRatio, onAspectRatioChange }: BottomToolbarProps) {
  const [description, setDescription] = useState("")

  const aspectRatios = [
    { label: "3:2", value: "3:2" },
    { label: "1:1", value: "1:1" },
    { label: "2:3", value: "2:3" },
  ]

  return (
    <div className="border-t border-gray-800 bg-black">
      {/* Aspect Ratio Selector */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">Aspect ratio</span>
        </div>
        <div className="flex gap-2">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.value}
              onClick={() => onAspectRatioChange(ratio.value)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                aspectRatio === ratio.value
                  ? "border-white bg-gray-800 text-white"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              <div className="w-4 h-4 border border-current rounded-sm flex items-center justify-center">
                {aspectRatio === ratio.value && <div className="w-2 h-2 bg-current rounded-full" />}
              </div>
              <span className="text-sm">{ratio.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Description Input */}
      <div className="px-6 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <Plus className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Describe your image..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
          />
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Wand2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="px-6 py-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <ImageIcon className="w-4 h-4" />
              <span className="text-sm">Image</span>
            </button>

            <button className="flex items-center gap-2 px-3 py-2 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors">
              <FileText className="w-4 h-4" />
              <span className="text-sm">2:3</span>
            </button>

            <button className="flex items-center gap-2 px-3 py-2 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors">
              <span className="text-sm">4v</span>
            </button>

            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
            </button>

            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {selectedMedia.title && (
          <div className="mt-2">
            <span className="text-sm text-gray-400">{selectedMedia.title}</span>
          </div>
        )}
      </div>
    </div>
  )
}
