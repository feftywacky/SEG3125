"use client"

import { useState, useEffect, useCallback } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-provider"
import { fetchMarketData } from "@/lib/api"
import { Loader2, RefreshCw } from "lucide-react"

interface MarketData {
  id: string
  name: string
  symbol: string
  current_price: number
  market_cap: number
  total_volume: number
  market_cap_rank: number
  price_change_percentage_24h: number
}

// Supported cryptocurrency IDs
const SUPPORTED_COIN_IDS = ["bitcoin", "ethereum", "solana", "ripple"]

export function MarketChart() {
  const { t, language } = useLanguage()
  const [selectedCount, setSelectedCount] = useState("4")
  const [selectedMetric, setSelectedMetric] = useState("market_cap")
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadMarketData = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      // Fetch more data to ensure we get all supported coins
      const data = await fetchMarketData(20)
      // Filter to only show supported cryptocurrencies
      const filteredData = data
        .filter((coin: MarketData) => SUPPORTED_COIN_IDS.includes(coin.id))
        .slice(0, Number.parseInt(selectedCount))
      setMarketData(filteredData)
    } catch (err) {
      console.error("Market chart error:", err)
      let errorMessage = t("error") // fallback
      
      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === "string") {
        errorMessage = err
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [selectedCount, t])

  const handleRetry = useCallback(() => {
    loadMarketData()
  }, [loadMarketData])

  useEffect(() => {
    loadMarketData()
  }, [loadMarketData])

  const formatValue = (value: number, metric: string) => {
    if (metric === "market_cap" || metric === "total_volume") {
      return new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(value)
    }
    return value.toFixed(2)
  }

  const getMetricLabel = () => {
    return selectedMetric === "market_cap" ? t("marketCap") : t("volume")
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-lg">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">{data.symbol.toUpperCase()}</p>
          <p className="text-blue-600 font-semibold">
            {`${getMetricLabel()}: ${formatValue(payload[0].value, selectedMetric)}`}
          </p>
          <p className="text-sm text-gray-600">
            {`${t("currentPrice")}: ${formatValue(data.current_price, "price")} USD`}
          </p>
        </div>
      )
    }
    return null
  }

  const chartData = marketData.map((coin) => ({
    ...coin,
    displayName: coin.symbol.toUpperCase(),
    value: coin[selectedMetric as keyof MarketData] as number,
  }))

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-2">{t("selectCount")}</label>
          <Select value={selectedCount} onValueChange={setSelectedCount}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">Top 2</SelectItem>
              <SelectItem value="3">Top 3</SelectItem>
              <SelectItem value="4">All 4</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-2">{t("selectMetric")}</label>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market_cap">{t("marketCap")}</SelectItem>
              <SelectItem value="total_volume">{t("volume")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
            <span className="ml-2 text-white">{t("loading")}</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="text-center">
              <p className="text-red-400 mb-2">{error}</p>
              <Button 
                onClick={handleRetry}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={loading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("retry")}
              </Button>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="displayName"
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
                tickFormatter={(value) => formatValue(value, selectedMetric)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
