export interface CoinData {
    id: string
    symbol: string
    name: string
    current_price: number
    market_cap: number
    total_volume: number
    price_change_percentage_24h: number
  }
  
  export interface HistoricalData {
    prices: [number, number][]
    market_caps: [number, number][]
    total_volumes: [number, number][]
  }
  
  const BASE_URL = "https://api.coingecko.com/api/v3"
  
  export async function fetchCoinHistory(coinId: string, days: string): Promise<HistoricalData> {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${days === "1" ? "hourly" : "daily"}`,
      )
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching coin history:", error)
      // Return mock data as fallback
      return generateMockHistoricalData(Number.parseInt(days))
    }
  }
  
  export async function fetchTopCoins(limit: number): Promise<CoinData[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
      )
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching top coins:", error)
      // Return mock data as fallback
      return generateMockTopCoins(limit)
    }
  }
  
  // Mock data generators for fallback
  function generateMockHistoricalData(days: number): HistoricalData {
    const now = Date.now()
    const dayMs = 24 * 60 * 60 * 1000
    const prices: [number, number][] = []
    const market_caps: [number, number][] = []
    const total_volumes: [number, number][] = []
  
    let basePrice = 45000 + Math.random() * 20000
    let baseMarketCap = basePrice * 19000000
    const baseVolume = 20000000000 + Math.random() * 10000000000
  
    for (let i = days; i >= 0; i--) {
      const timestamp = now - i * dayMs
      const priceVariation = (Math.random() - 0.5) * 0.1
      const price = basePrice * (1 + priceVariation)
      const marketCap = baseMarketCap * (1 + priceVariation)
      const volume = baseVolume * (0.8 + Math.random() * 0.4)
  
      prices.push([timestamp, price])
      market_caps.push([timestamp, marketCap])
      total_volumes.push([timestamp, volume])
  
      basePrice = price
      baseMarketCap = marketCap
    }
  
    return { prices, market_caps, total_volumes }
  }
  
  function generateMockTopCoins(limit: number): CoinData[] {
    const mockCoins = [
      { id: "bitcoin", symbol: "btc", name: "Bitcoin", basePrice: 45000, baseCap: 850000000000 },
      { id: "ethereum", symbol: "eth", name: "Ethereum", basePrice: 2800, baseCap: 340000000000 },
      { id: "binancecoin", symbol: "bnb", name: "BNB", basePrice: 320, baseCap: 48000000000 },
      { id: "cardano", symbol: "ada", name: "Cardano", basePrice: 0.45, baseCap: 15000000000 },
      { id: "solana", symbol: "sol", name: "Solana", basePrice: 95, baseCap: 42000000000 },
      { id: "polkadot", symbol: "dot", name: "Polkadot", basePrice: 6.5, baseCap: 8000000000 },
      { id: "chainlink", symbol: "link", name: "Chainlink", basePrice: 14, baseCap: 8200000000 },
      { id: "litecoin", symbol: "ltc", name: "Litecoin", basePrice: 85, baseCap: 6300000000 },
      { id: "polygon", symbol: "matic", name: "Polygon", basePrice: 0.85, baseCap: 7800000000 },
      { id: "avalanche-2", symbol: "avax", name: "Avalanche", basePrice: 28, baseCap: 10500000000 },
    ]
  
    return mockCoins.slice(0, limit).map((coin, index) => {
      const priceVariation = (Math.random() - 0.5) * 0.2
      const current_price = coin.basePrice * (1 + priceVariation)
      const market_cap = coin.baseCap * (1 + priceVariation)
      const total_volume = market_cap * (0.05 + Math.random() * 0.15)
      const price_change_percentage_24h = (Math.random() - 0.5) * 20
  
      return {
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        current_price,
        market_cap,
        total_volume,
        price_change_percentage_24h,
      }
    })
  }
  