"use client"

import { useState, useEffect, useCallback } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-provider"
import { fetchPriceHistory } from "@/lib/api"
import { Loader2, RefreshCw } from "lucide-react"

interface PriceData {
  date: string
  price: number
  timestamp: number
}

interface Coin {
  id: string
  name: string
  symbol: string
}

// Predefined list of supported cryptocurrencies
const SUPPORTED_COINS: Coin[] = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "solana", name: "Solana", symbol: "SOL" },
  { id: "ripple", name: "XRP", symbol: "XRP" },
]

export function PriceChart() {
  const { t, language } = useLanguage()
  const [selectedCoin, setSelectedCoin] = useState("bitcoin")
  const [selectedDays, setSelectedDays] = useState("7")
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadPriceData = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const data = await fetchPriceHistory(selectedCoin, selectedDays)
      const formattedData = data.prices.map(([timestamp, price]: [number, number]) => ({
        date: new Date(timestamp).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US"),
        price: price,
        timestamp,
      }))
      setPriceData(formattedData)
    } catch (err) {
      console.error("Price chart error:", err)
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
  }, [selectedCoin, selectedDays, t, language])

  const handleRetry = useCallback(() => {
    loadPriceData()
  }, [loadPriceData])

  useEffect(() => {
    if (selectedCoin) {
      loadPriceData()
    }
  }, [selectedCoin, selectedDays, loadPriceData])

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg border border-gray-200 shadow-lg">
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-blue-600 font-semibold">{`${t("price")}: ${formatPrice(payload[0].value)}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-2">{t("selectCrypto")}</label>
          <Select value={selectedCoin} onValueChange={setSelectedCoin}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_COINS.map((coin) => (
                <SelectItem key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-2">{t("selectTimeRange")}</label>
          <Select value={selectedDays} onValueChange={setSelectedDays}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">{t("days7")}</SelectItem>
              <SelectItem value="30">{t("days30")}</SelectItem>
              <SelectItem value="90">{t("days90")}</SelectItem>
              <SelectItem value="365">{t("days365")}</SelectItem>
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
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("retry")}
              </Button>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} tickFormatter={formatPrice} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#3B82F6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
