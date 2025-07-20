"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-slate-600 dark:text-slate-400" />
      <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <Button
          variant={language === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("en")}
          className="rounded-none border-0"
        >
          English
        </Button>
        <Button
          variant={language === "fr" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("fr")}
          className="rounded-none border-0"
        >
          Français
        </Button>
      </div>
    </div>
  )
}
