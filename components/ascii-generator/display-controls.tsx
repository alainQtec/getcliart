import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

interface DisplayControlsProps {
  asciiWidth: number
  fontSize: number
  invert: boolean
  onWidthChange: (value: number) => void
  onFontSizeChange: (value: number) => void
  onInvertChange: (value: boolean) => void
}

export function DisplayControls({
  asciiWidth,
  fontSize,
  invert,
  onWidthChange,
  onFontSizeChange,
  onInvertChange,
}: DisplayControlsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="width">Width</Label>
        <div className="flex items-center gap-2">
          <Input
            id="width"
            type="number"
            value={asciiWidth}
            onChange={(e) => onWidthChange(parseInt(e.target.value))}
          />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            chars
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontSize">Font Size</Label>
        <div className="flex items-center gap-2">
          <Input
            id="fontSize"
            type="number"
            value={fontSize}
            onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
          />
          <span className="text-sm text-muted-foreground">px</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="invert">Invert Colors</Label>
        <Switch
          id="invert"
          checked={invert}
          onCheckedChange={onInvertChange}
        />
      </div>
    </div>
  )
}