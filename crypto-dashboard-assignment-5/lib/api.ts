const BASE_URL = "https://api.coingecko.com/api/v3"

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

function getCacheKey(endpoint: string, params: Record<string, any> = {}): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&')
  return `${endpoint}?${sortedParams}`
}

function getCachedData(key: string): any | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

function setCachedData(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() })
}

function getErrorMessage(status: number, defaultMessage: string): string {
  switch (status) {
    case 429:
      return "Rate limit exceeded. Please wait a moment before trying again."
    case 403:
      return "Access forbidden. API key may be invalid or expired."
    case 404:
      return "Data not found. The requested cryptocurrency may not exist."
    case 500:
      return "Server error. Please try again later."
    case 502:
    case 503:
    case 504:
      return "Service temporarily unavailable. Please try again later."
    default:
      return defaultMessage
  }
}

async function makeApiRequest(url: string, errorContext: string, cacheKey?: string) {
  // Check cache first
  if (cacheKey) {
    const cachedData = getCachedData(cacheKey)
    if (cachedData) {
      return cachedData
    }
  }

  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      const errorMessage = getErrorMessage(response.status, `Failed to ${errorContext}`)
      throw new Error(errorMessage)
    }
    
    const data = await response.json()
    
    // Cache the successful response
    if (cacheKey) {
      setCachedData(cacheKey, data)
    }
    
    return data
  } catch (error) {
    // Handle network errors and other fetch failures
    if (error instanceof TypeError) {
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        throw new Error("Network error. Please check your connection and try again.")
      }
    }
    
    // Handle AbortError (request cancelled)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error("Request was cancelled. Please try again.")
    }
    
    // Re-throw our custom error messages
    if (error instanceof Error) {
      throw error
    }
    
    // Fallback for unknown errors
    throw new Error(`Failed to ${errorContext}. Please try again.`)
  }
}

export async function fetchPriceHistory(coinId: string, days: string) {
  const url = `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${days === "1" ? "hourly" : "daily"}`
  const cacheKey = getCacheKey(`/coins/${coinId}/market_chart`, { days, interval: days === "1" ? "hourly" : "daily" })
  return makeApiRequest(url, "fetch price history", cacheKey)
}

export async function fetchMarketData(perPage = 10) {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`
  const cacheKey = getCacheKey('/coins/markets', { per_page: perPage, page: 1 })
  return makeApiRequest(url, "fetch market data", cacheKey)
}

export async function fetchCoinsList() {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  const cacheKey = getCacheKey('/coins/markets', { per_page: 100, page: 1 })
  return makeApiRequest(url, "fetch coins list", cacheKey)
}

// Function to clear cache (useful for testing or manual refresh)
export function clearCache(): void {
  cache.clear()
}
