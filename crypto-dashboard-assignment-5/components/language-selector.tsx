"use client"

import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-white" />
      <div className="flex bg-white/10 rounded-lg p-1 border border-white/20">
        <Button
          variant={language === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 text-sm font-medium transition-all ${
            language === "en" ? "bg-blue-600 text-white shadow-sm" : "text-white hover:bg-white/10"
          }`}
        >
          EN
        </Button>
        <Button
          variant={language === "fr" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("fr")}
          className={`px-3 py-1 text-sm font-medium transition-all ${
            language === "fr" ? "bg-blue-600 text-white shadow-sm" : "text-white hover:bg-white/10"
          }`}
        >
          FR
        </Button>
      </div>
    </div>
  )
}
