"use client"
import { LanguageProvider } from "@/components/language-provider"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  return (
    <LanguageProvider>
      <Dashboard />
    </LanguageProvider>
  )
}
