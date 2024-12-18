"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronRight, Settings, Image } from "lucide-react"
import { DitheringControls } from "./dithering-controls"
import { DisplayControls } from "./display-controls"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  dithererName: string
  threshold: number
  asciiWidth: number
  fontSize: number
  invert: boolean
  onDithererChange: (value: string) => void
  onThresholdChange: (value: number) => void
  onWidthChange: (value: number) => void
  onFontSizeChange: (value: number) => void
  onInvertChange: (value: boolean) => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Sidebar({
  className,
  dithererName,
  threshold,
  asciiWidth,
  fontSize,
  invert,
  onDithererChange,
  onThresholdChange,
  onWidthChange,
  onFontSizeChange,
  onInvertChange,
  onFileChange,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(true)

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <div className="space-y-4">
              <div className="px-4">
                <div className="flex items-center gap-2">
                  <Image strokeWidth={1.5} />
                  <Label htmlFor="file">Upload Image</Label>
                </div>
                <Input
                  id="file"
                  type="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={onFileChange}
                  className="mt-2"
                />
              </div>
              <Button
                variant="ghost"
                className="w-full justify-between px-4"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Adjust</span>
                </div>
                {isSettingsOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {isSettingsOpen && (
                <div className="space-y-4 px-4">
                  <DitheringControls
                    dithererName={dithererName}
                    threshold={threshold}
                    onDithererChange={onDithererChange}
                    onThresholdChange={onThresholdChange}
                  />
                  <DisplayControls
                    asciiWidth={asciiWidth}
                    fontSize={fontSize}
                    invert={invert}
                    onWidthChange={onWidthChange}
                    onFontSizeChange={onFontSizeChange}
                    onInvertChange={onInvertChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}