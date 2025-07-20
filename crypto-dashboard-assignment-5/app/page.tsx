"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, TrendingUp, BarChart3 } from "lucide-react"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import { fetchCoinHistory, fetchTopCoins, type CoinData, type HistoricalData } from "@/lib/api"
import PriceChart from "@/components/price-chart"
import MarketChart from "@/components/market-chart"
import LanguageSelector from "@/components/language-selector"

function Dashboard() {
  const { t } = useLanguage()
  const [selectedCoin, setSelectedCoin] = useState("bitcoin")
  const [timeRange, setTimeRange] = useState("7")
  const [topCount, setTopCount] = useState(10)
  const [marketMetric, setMarketMetric] = useState<"market_cap" | "total_volume">("market_cap")

  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null)
  const [topCoins, setTopCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const availableCoins = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "binancecoin", name: "BNB", symbol: "BNB" },
    { id: "cardano", name: "Cardano", symbol: "ADA" },
    { id: "solana", name: "Solana", symbol: "SOL" },
    { id: "polkadot", name: "Polkadot", symbol: "DOT" },
    { id: "chainlink", name: "Chainlink", symbol: "LINK" },
    { id: "litecoin", name: "Litecoin", symbol: "LTC" },
  ]

  const timeRanges = [
    { value: "7", label: t("7days") },
    { value: "30", label: t("30days") },
    { value: "90", label: t("90days") },
    { value: "365", label: t("1year") },
  ]

  useEffect(() => {
    loadData()
  }, [selectedCoin, timeRange, topCount])

  const loadData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [historyData, coinsData] = await Promise.all([
        fetchCoinHistory(selectedCoin, timeRange),
        fetchTopCoins(topCount),
      ])

      setHistoricalData(historyData)
      setTopCoins(coinsData)
    } catch (err) {
      setError(t("errorLoading"))
      console.error("Error loading data:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-600 dark:text-slate-400">{t("loading")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              {t("dashboardTitle")}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">{t("dashboardDescription")}</p>
          </div>
          <LanguageSelector />
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <CardContent className="pt-6">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <Button onClick={loadData} className="mt-2 bg-transparent" variant="outline" size="sm">
                {t("retry")}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t("selectCryptocurrency")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableCoins.map((coin) => (
                    <SelectItem key={coin.id} value={coin.id}>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {coin.symbol}
                        </Badge>
                        {coin.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t("timeRange")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t("topCoinsCount")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={topCount.toString()} onValueChange={(value) => setTopCount(Number.parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Top 5</SelectItem>
                  <SelectItem value="10">Top 10</SelectItem>
                  <SelectItem value="20">Top 20</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t("marketMetric")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant={marketMetric === "market_cap" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMarketMetric("market_cap")}
                  className="flex-1"
                >
                  {t("marketCap")}
                </Button>
                <Button
                  variant={marketMetric === "total_volume" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMarketMetric("total_volume")}
                  className="flex-1"
                >
                  {t("volume")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                {t("priceChart")}
              </CardTitle>
              <CardDescription>{t("priceChartDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              {historicalData ? (
                <PriceChart
                  data={historicalData}
                  coinName={availableCoins.find((c) => c.id === selectedCoin)?.name || selectedCoin}
                />
              ) : (
                <div className="h-80 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                {t("marketChart")}
              </CardTitle>
              <CardDescription>{t("marketChartDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              {topCoins.length > 0 ? (
                <MarketChart data={topCoins} metric={marketMetric} />
              ) : (
                <div className="h-80 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>{t("dataSource")}: CoinGecko API</p>
          <p className="mt-1">
            {t("lastUpdated")}: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <Dashboard />
    </LanguageProvider>
  )
}
