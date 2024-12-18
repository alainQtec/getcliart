'use client'

import cn from 'classnames';
import { useState, useEffect } from 'react'
import { MobileSidebar } from '@/components/ascii-generator/mobile-sidebar'
import { DesktopSidebar } from '@/components/ascii-generator/desktop-sidebar'
import { AsciiOutput } from '@/components/ascii-generator/ascii-output'
import { KernelDitherer } from '@/lib/dithering'
import { convertImageToAscii } from '@/lib/ascii-converter'

const ditherers = {
  threshold: new KernelDitherer([0, 0], [], 1),
  floydSteinberg: new KernelDitherer([1, 0], [
    [0, 0, 7],
    [3, 5, 1],
  ], 16),
  stucki: new KernelDitherer([2, 0], [
    [0, 0, 0, 8, 4],
    [2, 4, 8, 4, 2],
    [1, 2, 4, 2, 1],
  ], 42),
  atkinson: new KernelDitherer([1, 0], [
    [0, 0, 1, 1],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
  ], 8),
}

export default function Home() {
  const [dithererName, setDithererName] = useState('floydSteinberg')
  const [invert, setInvert] = useState(false)
  const [threshold, setThreshold] = useState(127)
  const [asciiWidth, setAsciiWidth] = useState(100)
  const [fontSize, setFontSize] = useState(10)
  const [ascii, setAscii] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [currentFile, setCurrentFile] = useState<File | null>(null)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false)

  const generateAscii = async (file: File | null) => {
    if (!file) return

    const result = await convertImageToAscii(file, {
      ditherer: ditherers[dithererName as keyof typeof ditherers],
      threshold,
      asciiWidth,
      invert
    })

    setAscii(result)
    setCharCount(result.length)
  }

  useEffect(() => {
    if (currentFile) {
      generateAscii(currentFile)
    }
  }, [dithererName, threshold, asciiWidth, invert, currentFile])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    const file = e.target.files[0]
    setCurrentFile(file)
    await generateAscii(file)
  }

  const sidebarProps = {
    dithererName,
    threshold,
    asciiWidth,
    fontSize,
    invert,
    onDithererChange: setDithererName,
    onThresholdChange: setThreshold,
    onWidthChange: setAsciiWidth,
    onFontSizeChange: setFontSize,
    onInvertChange: setInvert,
    onFileChange: handleFileChange,
  }

  return (
    <div className="flex min-h-screen">
      <DesktopSidebar
        {...sidebarProps}
        isCollapsed={isDesktopSidebarCollapsed}
        onCollapsedChange={setIsDesktopSidebarCollapsed}
      />
      <MobileSidebar
        {...sidebarProps}
        isOpen={isMobileSidebarOpen}
        onOpenChange={setIsMobileSidebarOpen}
      />
      <main className={cn(
        "flex-1 p-8 transition-all duration-300",
        isDesktopSidebarCollapsed ? "md:ml-16" : "md:ml-80"
      )}>
        {ascii && (
          <AsciiOutput
            ascii={ascii}
            charCount={charCount}
            fontSize={fontSize}
            onCopy={() => navigator.clipboard.writeText(ascii)}
          />
        )}
      </main>
    </div>
  )
}