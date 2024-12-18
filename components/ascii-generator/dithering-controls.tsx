import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface DitheringControlsProps {
  dithererName: string
  threshold: number
  onDithererChange: (value: string) => void
  onThresholdChange: (value: number) => void
}

export function DitheringControls({
  dithererName,
  threshold,
  onDithererChange,
  onThresholdChange,
}: DitheringControlsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="dither">Dither Mode</Label>
        <Select value={dithererName} onValueChange={onDithererChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select dither mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="floydSteinberg">Floyd-Steinberg (simple)</SelectItem>
            <SelectItem value="stucki">Stucki (edge contrast)</SelectItem>
            <SelectItem value="atkinson">Atkinson (high contrast)</SelectItem>
            <SelectItem value="threshold">Threshold (no dither)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="threshold">Threshold</Label>
        <Slider
          id="threshold"
          min={0}
          max={254}
          value={[threshold]}
          onValueChange={([value]) => onThresholdChange(value)}
        />
      </div>
    </div>
  )
}