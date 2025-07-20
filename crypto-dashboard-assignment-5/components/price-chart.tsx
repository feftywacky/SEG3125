"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useLanguage } from "@/lib/language-context"
import type { HistoricalData } from "@/lib/api"

interface PriceChartProps {
  data: HistoricalData
  coinName: string
}

export default function PriceChart({ data, coinName }: PriceChartProps) {
  const { t, language } = useLanguage()

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
      month: "short",
      day: "numeric",
      hour: data.prices.length > 30 ? undefined : "2-digit",
    })
  }

  const chartData = data.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
    date: formatDate(timestamp),
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {new Date(data.timestamp).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            {t("price")}: {formatPrice(data.price)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-slate-600 dark:text-slate-400" />
          <YAxis tickFormatter={formatPrice} tick={{ fontSize: 12 }} className="text-slate-600 dark:text-slate-400" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#2563eb" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
