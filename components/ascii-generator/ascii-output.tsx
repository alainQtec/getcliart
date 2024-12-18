import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface AsciiOutputProps {
  ascii: string
  charCount: number
  fontSize: number
  onCopy: () => void
}

export function AsciiOutput({ ascii, charCount, fontSize, onCopy }: AsciiOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ascii)
    setCopied(true)
    onCopy()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {charCount.toLocaleString()} characters
        </span>
        <Button 
          onClick={handleCopy}
          size="sm"
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div 
        className="ascii-output p-4 rounded border bg-card"
        style={{ fontSize: `${fontSize}px` }}
        dangerouslySetInnerHTML={{ 
          __html: ascii.split('\n').map(line => 
            line.split('').map(char => `<span>${char}</span>`).join('')
          ).join('<br>')
        }}
      />
    </div>
  )
}