"use client"

import { Plus, Video, FileText, HelpCircle, ArrowUp, Grid3X3, FolderOpen, Upload } from "lucide-react"
import { useState, useRef, useEffect } from "react"

// Custom aspect ratio icons
const AspectRatioIcon = ({ ratio }: { ratio: string }) => {
  switch (ratio) {
    case "3:2":
      return <div className="w-4 h-3 border border-white/60 rounded-sm bg-transparent"></div>
    case "1:1":
      return <div className="w-3 h-3 border border-white/60 rounded-sm bg-transparent"></div>
    case "2:3":
      return <div className="w-3 h-4 border border-white/60 rounded-sm bg-transparent"></div>
    default:
      return <div className="w-3 h-3 border border-white/60 rounded-sm bg-transparent"></div>
  }
}

export function VideoGlassyOverlay() {
  const [description, setDescription] = useState("")
  const [showAddDropdown, setShowAddDropdown] = useState(false)
  const [showAspectDropdown, setShowAspectDropdown] = useState(false)
  const [showVariationsDropdown, setShowVariationsDropdown] = useState(false)
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("2:3")
  const [selectedVariations, setSelectedVariations] = useState("4 videos")

  const addDropdownRef = useRef<HTMLDivElement>(null)
  const aspectDropdownRef = useRef<HTMLDivElement>(null)
  const variationsDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (addDropdownRef.current && !addDropdownRef.current.contains(event.target as Node)) {
        setShowAddDropdown(false)
      }
      if (aspectDropdownRef.current && !aspectDropdownRef.current.contains(event.target as Node)) {
        setShowAspectDropdown(false)
      }
      if (variationsDropdownRef.current && !variationsDropdownRef.current.contains(event.target as Node)) {
        setShowVariationsDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const aspectRatios = [
    { label: "3:2", value: "3:2" },
    { label: "1:1", value: "1:1" },
    { label: "2:3", value: "2:3" },
  ]

  const variations = [
    { label: "4 videos", value: "4 videos", icon: Grid3X3 },
    { label: "2 videos", value: "2 videos", icon: Grid3X3 },
    { label: "1 video", value: "1 video", icon: Video },
  ]

  return (
    <div className="fixed bottom-6 left-0 lg:left-[16rem] right-0 z-10 px-6">
      <div className="w-full max-w-[760px] mx-auto glassy-container p-4 space-y-4" style={{ borderRadius: "24px" }}>
        {/* Description Input */}
        <div className="flex items-center gap-3">
          <div className="relative" ref={addDropdownRef}>
            <button
              onClick={() => setShowAddDropdown(!showAddDropdown)}
              className="p-1 text-white/80 hover:text-white transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>

            {showAddDropdown && (
              <div className="absolute bottom-full mb-2 left-0 glassy-container rounded-2xl p-3 min-w-[200px]">
                <h3 className="text-white/80 text-sm font-medium mb-3">Add videos</h3>
                <div className="space-y-2">
                  <button className="flex items-center gap-2 w-full p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                    <FolderOpen className="w-4 h-4" />
                    <span className="text-sm">Choose from library</span>
                  </button>
                  <button className="flex items-center gap-2 w-full p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">Upload from device</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Describe your video..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-sm"
          />
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20">
              <Video className="w-4 h-4 text-white" />
              <span className="text-sm text-white">Video</span>
            </button>

            <div className="relative" ref={aspectDropdownRef}>
              <button
                onClick={() => setShowAspectDropdown(!showAspectDropdown)}
                className="flex items-center gap-2 px-3 py-2 bg-transparent backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors border border-white/20"
              >
                <AspectRatioIcon ratio={selectedAspectRatio} />
                <span className="text-sm text-white">{selectedAspectRatio}</span>
              </button>

              {showAspectDropdown && (
                <div className="absolute bottom-full mb-2 left-0 glassy-container rounded-2xl p-3 min-w-[160px]">
                  <h3 className="text-white/80 text-sm font-medium mb-3">Aspect ratio</h3>
                  <div className="space-y-2">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio.value}
                        onClick={() => {
                          setSelectedAspectRatio(ratio.value)
                          setShowAspectDropdown(false)
                        }}
                        className="flex items-center justify-between w-full p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <AspectRatioIcon ratio={ratio.value} />
                          <span className="text-sm">{ratio.label}</span>
                        </div>
                        <div className="w-4 h-4 border border-white/40 rounded-full flex items-center justify-center">
                          {selectedAspectRatio === ratio.value && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={variationsDropdownRef}>
              <button
                onClick={() => setShowVariationsDropdown(!showVariationsDropdown)}
                className="flex items-center gap-2 px-3 py-2 bg-transparent backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors border border-white/20"
              >
                <Grid3X3 className="w-4 h-4 text-white" />
                <span className="text-sm text-white">4v</span>
              </button>

              {showVariationsDropdown && (
                <div className="absolute bottom-full mb-2 left-0 glassy-container rounded-2xl p-3 min-w-[160px]">
                  <h3 className="text-white/80 text-sm font-medium mb-3">Variations</h3>
                  <div className="space-y-2">
                    {variations.map((variation) => (
                      <button
                        key={variation.value}
                        onClick={() => {
                          setSelectedVariations(variation.value)
                          setShowVariationsDropdown(false)
                        }}
                        className="flex items-center justify-between w-full p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <variation.icon className="w-4 h-4" />
                          <span className="text-sm">{variation.label}</span>
                        </div>
                        <div className="w-4 h-4 border border-white/40 rounded-full flex items-center justify-center">
                          {selectedVariations === variation.value && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 text-white/80 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
              <FileText className="w-4 h-4" />
            </button>

            <button className="p-2 text-white/80 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <button className="p-2 text-white/80 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
