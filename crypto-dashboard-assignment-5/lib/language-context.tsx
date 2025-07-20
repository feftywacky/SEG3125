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
    dashboardTitle: "Global Cryptocurrency Market Dashboard",
    dashboardDescription:
      "Real-time cryptocurrency market data with interactive charts showing price trends and market comparisons across top digital assets.",
    selectCryptocurrency: "Select Cryptocurrency",
    timeRange: "Time Range",
    topCoinsCount: "Top Coins Count",
    marketMetric: "Market Metric",
    priceChart: "Price Trend Analysis",
    priceChartDescription: "Historical price movement over selected time period",
    marketChart: "Market Comparison",
    marketChartDescription: "Compare market capitalization and trading volume",
    loading: "Loading market data...",
    errorLoading: "Error loading cryptocurrency data. Please try again.",
    retry: "Retry",
    price: "Price",
    marketCap: "Market Cap",
    volume: "24h Volume",
    dataSource: "Data Source",
    lastUpdated: "Last Updated",
    "7days": "7 Days",
    "30days": "30 Days",
    "90days": "90 Days",
    "1year": "1 Year",
    market_cap: "Market Cap",
    total_volume: "24h Volume",
  },
  fr: {
    dashboardTitle: "Tableau de Bord du Marché Mondial des Cryptomonnaies",
    dashboardDescription:
      "Données de marché des cryptomonnaies en temps réel avec des graphiques interactifs montrant les tendances de prix et les comparaisons de marché.",
    selectCryptocurrency: "Sélectionner une Cryptomonnaie",
    timeRange: "Période",
    topCoinsCount: "Nombre de Cryptos",
    marketMetric: "Métrique de Marché",
    priceChart: "Analyse des Tendances de Prix",
    priceChartDescription: "Mouvement historique des prix sur la période sélectionnée",
    marketChart: "Comparaison de Marché",
    marketChartDescription: "Comparer la capitalisation boursière et le volume des échanges",
    loading: "Chargement des données de marché...",
    errorLoading: "Erreur lors du chargement des données. Veuillez réessayer.",
    retry: "Réessayer",
    price: "Prix",
    marketCap: "Cap. Marché",
    volume: "Volume 24h",
    dataSource: "Source des Données",
    lastUpdated: "Dernière Mise à Jour",
    "7days": "7 Jours",
    "30days": "30 Jours",
    "90days": "90 Jours",
    "1year": "1 An",
    market_cap: "Cap. Marché",
    total_volume: "Volume 24h",
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
