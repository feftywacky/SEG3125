"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "./language-provider"
import { fetchPriceHistory, fetchCoinsList } from "@/lib/api"
import { getNetworkErrorMessage } from "@/lib/network-utils"
import { Loader2 } from "lucide-react"

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

export function PriceChart() {
  const { t, language } = useLanguage()
  const [selectedCoin, setSelectedCoin] = useState("bitcoin")
  const [selectedDays, setSelectedDays] = useState("7")
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [retryCount, setRetryCount] = useState(0)

  // No automatic retry - only manual retry through button

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const coinsData = await fetchCoinsList()
        setCoins(coinsData.slice(0, 20)) // Top 20 coins for selection
        setError("")
      } catch (err) {
        console.error('Error loading coins:', err)
        let errorMessage: string
        
        // Check for rate limiting first
        if (err instanceof Error && (err.message === 'RATE_LIMITED' || err.message.includes('429'))) {
          errorMessage = "Rate limited: Too many requests. Please wait a few minutes before trying again."
        } else {
          errorMessage = err instanceof Error ? getNetworkErrorMessage(err) : t("error")
        }
        
        setError(errorMessage)
      }
    }
    loadCoins()
  }, [t])

  useEffect(() => {
    const loadPriceData = async () => {
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
        setRetryCount(0) // Reset retry count on success
      } catch (err) {
        console.error('Error loading price data:', err)
        let errorMessage: string
        
        // Check for rate limiting first
        if (err instanceof Error && (err.message === 'RATE_LIMITED' || err.message.includes('429'))) {
          errorMessage = "Rate limited: Too many requests. Please wait a few minutes before trying again."
        } else {
          errorMessage = err instanceof Error ? getNetworkErrorMessage(err) : t("error")
        }
        
        setError(errorMessage)
        // Keep previous data if available to avoid empty chart
        if (priceData.length === 0) {
          setPriceData([])
        }
      } finally {
        setLoading(false)
      }
    }

    if (selectedCoin) {
      loadPriceData()
    }
  }, [selectedCoin, selectedDays, t, language, retryCount]) // Removed priceData.length dependency as it would cause infinite loops

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value)
  }

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { name: string } }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg border border-gray-200 shadow-lg">
          <p className="text-gray-600 text-sm">{payload[0].payload.name}</p>
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
              {coins.map((coin) => (
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
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
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
