"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    title: "Global Cryptocurrency Market Dashboard",
    description:
      "Real-time cryptocurrency data visualization showing price trends and market comparisons. Data sourced from CoinGecko API.",
    priceChart: "Price Trend Over Time",
    marketChart: "Market Comparison",
    selectCrypto: "Select Cryptocurrency",
    selectTimeRange: "Time Range",
    selectCount: "Number of Coins",
    selectMetric: "Metric",
    marketCap: "Market Cap",
    volume: "Volume (24h)",
    price: "Price (USD)",
    loading: "Loading...",
    error: "Error loading data",
    days7: "7 Days",
    days30: "30 Days",
    days90: "90 Days",
    days365: "1 Year",
    top5: "Top 5",
    top10: "Top 10",
    top20: "Top 20",
    usd: "USD",
    rank: "Rank",
    name: "Name",
    symbol: "Symbol",
    currentPrice: "Current Price",
    marketCapLabel: "Market Cap",
    volumeLabel: "24h Volume",
    change24h: "24h Change",
    retry: "Retry",
    rateLimited: "Rate Limited",
    rateLimitMessage: "Too many requests. Please wait a few minutes before trying again.",
  },
  fr: {
    title: "Tableau de Bord du Marché des Cryptomonnaies",
    description:
      "Visualisation de données de cryptomonnaies en temps réel montrant les tendances de prix et les comparaisons de marché. Données provenant de l'API CoinGecko.",
    priceChart: "Tendance des Prix dans le Temps",
    marketChart: "Comparaison du Marché",
    selectCrypto: "Sélectionner une Cryptomonnaie",
    selectTimeRange: "Période",
    selectCount: "Nombre de Pièces",
    selectMetric: "Métrique",
    marketCap: "Capitalisation",
    volume: "Volume (24h)",
    price: "Prix (USD)",
    loading: "Chargement...",
    error: "Erreur de chargement des données",
    days7: "7 Jours",
    days30: "30 Jours",
    days90: "90 Jours",
    days365: "1 An",
    top5: "Top 5",
    top10: "Top 10",
    top20: "Top 20",
    usd: "USD",
    rank: "Rang",
    name: "Nom",
    symbol: "Symbole",
    currentPrice: "Prix Actuel",
    marketCapLabel: "Capitalisation",
    volumeLabel: "Volume 24h",
    change24h: "Variation 24h",
    retry: "Réessayer",
    rateLimited: "Limite de Taux",
    rateLimitMessage: "Trop de requêtes. Veuillez attendre quelques minutes avant de réessayer.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
