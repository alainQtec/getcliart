export interface SidebarProps {
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