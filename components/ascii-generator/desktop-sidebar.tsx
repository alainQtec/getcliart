'use client'

import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { Sidebar } from "./sidebar"
import { SidebarProps } from "./sidebar.types"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Terminal } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface DesktopSidebarProps extends SidebarProps {
  isCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export function DesktopSidebar({
  isCollapsed = false,
  onCollapsedChange,
  ...props
}: DesktopSidebarProps) {
  return (
    <aside className={cn(
      "hidden md:flex flex-col border-r bg-background transition-all duration-300",
      isCollapsed ? "w-16" : "w-80"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!isCollapsed && (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>cliartgen</AlertTitle>
              <AlertDescription>
                v0.1.2
              </AlertDescription>
          </Alert>
        )}
        <div className="flex items-center gap-2">
          {!isCollapsed && <ThemeToggleButton />}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCollapsedChange?.(!isCollapsed)}
            className="transition-transform duration-200"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
            ) : (
              <ChevronLeft className="h-4 w-4 transition-transform duration-200" />
            )}
          </Button>
        </div>
      </div>
      {!isCollapsed && <Sidebar {...props} />}
    </aside>
  )
}