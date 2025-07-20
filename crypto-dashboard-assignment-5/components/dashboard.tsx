"use client"

import { useLanguage } from "./language-provider"
import { LanguageSelector } from "./language-selector"
import { PriceChart } from "./price-chart"
import { MarketChart } from "./market-chart"

export function Dashboard() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{t("title")}</h1>
            <p className="text-slate-300 text-lg max-w-3xl">{t("description")}</p>
          </div>
          <LanguageSelector />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">{t("priceChart")}</h2>
            <PriceChart />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">{t("marketChart")}</h2>
            <MarketChart />
          </div>
        </div>
      </div>
    </div>
  )
}
