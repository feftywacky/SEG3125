"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "./language-provider"
import { fetchMarketData } from "@/lib/api"
import { getNetworkErrorMessage } from "@/lib/network-utils"
import { Loader2 } from "lucide-react"

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

export function MarketChart() {
  const { t, language } = useLanguage()
  const [selectedCount, setSelectedCount] = useState("10")
  const [selectedMetric, setSelectedMetric] = useState("market_cap")
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [retryCount, setRetryCount] = useState(0)

  // No automatic retry - only manual retry through button

  useEffect(() => {
    const loadMarketData = async () => {
      setLoading(true)
      setError("")
      try {
        const data = await fetchMarketData(Number.parseInt(selectedCount))
        setMarketData(data)
        setRetryCount(0) // Reset retry count on success
      } catch (err) {
        console.error('Error loading market data:', err)
        let errorMessage: string
        
        // Check for rate limiting first
        if (err instanceof Error && (err.message === 'RATE_LIMITED' || err.message.includes('429'))) {
          errorMessage = "Rate limited: Too many requests. Please wait a few minutes before trying again."
        } else {
          errorMessage = err instanceof Error ? getNetworkErrorMessage(err) : t("error")
        }
        
        setError(errorMessage)
        // Keep previous data if available
        if (marketData.length === 0) {
          setMarketData([])
        }
      } finally {
        setLoading(false)
      }
    }

    loadMarketData()
  }, [selectedCount, t, retryCount]) // Removed marketData.length dependency as it would cause infinite loops

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

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

  const CustomTooltip = ({ active, payload }: { 
    active?: boolean; 
    payload?: Array<{ 
      value: number; 
      payload: MarketData; 
    }> 
  }) => {
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
              <SelectItem value="5">{t("top5")}</SelectItem>
              <SelectItem value="10">{t("top10")}</SelectItem>
              <SelectItem value="20">{t("top20")}</SelectItem>
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
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-green-400" />
            <span className="text-white/80">{t("loading")}</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <span className="text-red-400 text-center">{error}</span>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {t("retry")}
            </button>
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
