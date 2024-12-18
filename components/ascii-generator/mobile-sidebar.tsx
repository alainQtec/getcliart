'use client'

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { Sidebar } from "./sidebar"
import { SidebarProps } from "./sidebar.types"

interface MobileSidebarProps extends SidebarProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileSidebar({
  isOpen,
  onOpenChange,
  ...sidebarProps
}: MobileSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 transition-transform duration-200 ease-in-out"
        >
          {isOpen ? (
            <ChevronLeft className="h-6 w-6 transition-transform duration-200" />
          ) : (
            <ChevronRight className="h-6 w-6 transition-transform duration-200" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <SheetTitle className="text-lg font-semibold">
          <h1 className="text-lg font-semibold">cliartgen</h1>
          </SheetTitle>
          <ThemeToggleButton />
        </div>
        <Sidebar {...sidebarProps} />
      </SheetContent>
    </Sheet>
  )
}