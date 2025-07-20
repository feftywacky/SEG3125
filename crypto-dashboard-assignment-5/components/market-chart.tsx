"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useLanguage } from "@/lib/language-context"
import type { CoinData } from "@/lib/api"

interface MarketChartProps {
  data: CoinData[]
  metric: "market_cap" | "total_volume"
}

export default function MarketChart({ data, metric }: MarketChartProps) {
  const { t, language } = useLanguage()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value)
  }

  const chartData = data.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    fullName: coin.name,
    value: coin[metric],
    formattedValue: formatCurrency(coin[metric]),
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {data.fullName} ({data.name})
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">
            {t(metric)}: {data.formattedValue}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} className="text-slate-600 dark:text-slate-400" />
          <YAxis
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12 }}
            className="text-slate-600 dark:text-slate-400"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#16a34a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
