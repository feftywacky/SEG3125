const BASE_URL = "https://api.coingecko.com/api/v3"

// Simple cache implementation
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

function getCachedData(key: string): unknown | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Using cached data for: ${key}`)
    return cached.data
  }
  return null
}

function setCachedData(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() })
  console.log(`Cached data for: ${key}`)
}

// Simple fetch with timeout - no automatic retries
async function fetchWithTimeout(url: string, options = {}): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function fetchPriceHistory(coinId: string, days: string) {
  const cacheKey = `price-${coinId}-${days}`
  const cachedData = getCachedData(cacheKey)
  
  if (cachedData) {
    return cachedData
  }
  
  const url = `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${days === "1" ? "hourly" : "daily"}`
  console.log(`Fetching price history: ${url}`)
  
  try {
    const response = await fetchWithTimeout(url)
    
    console.log(`Response status: ${response.status} ${response.statusText}`)
    console.log(`Response headers:`, Object.fromEntries(response.headers.entries()))
    
    if (response.status === 429) {
      console.error('Rate limited - 429 status received')
      throw new Error('RATE_LIMITED')
    }
    
    if (!response.ok) {
      console.error(`HTTP error: ${response.status} ${response.statusText}`)
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log(`Successfully fetched price history for ${coinId}, data points: ${data.prices?.length || 0}`)
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error('Failed to fetch price history:', error)
    
    // Check for rate limiting - TypeError: Failed to fetch often indicates 429
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Failed to fetch - likely rate limited (429)')
      throw new Error('RATE_LIMITED')
    }
    
    // Check if the error message contains 429 (for net::ERR_FAILED 429 cases)
    if (error instanceof Error && (error.message.includes('429') || error.message.includes('Too Many Requests'))) {
      console.error('Rate limited - detected from error message')
      throw new Error('RATE_LIMITED')
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Request timed out')
      throw new Error('REQUEST_TIMEOUT')
    }
    
    throw error
  }
}

export async function fetchMarketData(perPage = 10) {
  const cacheKey = `market-${perPage}`
  const cachedData = getCachedData(cacheKey)
  
  if (cachedData) {
    return cachedData
  }
  
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`
  console.log(`Fetching market data: ${url}`)
  
  try {
    const response = await fetchWithTimeout(url)
    
    console.log(`Response status: ${response.status} ${response.statusText}`)
    console.log(`Response headers:`, Object.fromEntries(response.headers.entries()))
    
    if (response.status === 429) {
      console.error('Rate limited - 429 status received')
      throw new Error('RATE_LIMITED')
    }
    
    if (!response.ok) {
      console.error(`HTTP error: ${response.status} ${response.statusText}`)
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log(`Successfully fetched market data, ${data.length} coins received`)
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error('Failed to fetch market data:', error)
    
    // Check for rate limiting - TypeError: Failed to fetch often indicates 429
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Failed to fetch - likely rate limited (429)')
      throw new Error('RATE_LIMITED')
    }
    
    // Check if the error message contains 429 (for net::ERR_FAILED 429 cases)
    if (error instanceof Error && (error.message.includes('429') || error.message.includes('Too Many Requests'))) {
      console.error('Rate limited - detected from error message')
      throw new Error('RATE_LIMITED')
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Request timed out')
      throw new Error('REQUEST_TIMEOUT')
    }
    
    throw error
  }
}

export async function fetchCoinsList() {
  const cacheKey = 'coins-list'
  const cachedData = getCachedData(cacheKey)
  
  if (cachedData) {
    return cachedData
  }
  
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  console.log(`Fetching coins list: ${url}`)
  
  try {
    const response = await fetchWithTimeout(url)
    
    console.log(`Response status: ${response.status} ${response.statusText}`)
    console.log(`Response headers:`, Object.fromEntries(response.headers.entries()))
    
    if (response.status === 429) {
      console.error('Rate limited - 429 status received')
      throw new Error('RATE_LIMITED')
    }
    
    if (!response.ok) {
      console.error(`HTTP error: ${response.status} ${response.statusText}`)
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log(`Successfully fetched coins list, ${data.length} coins received`)
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error('Failed to fetch coins list:', error)
    
    // Check for rate limiting - TypeError: Failed to fetch often indicates 429
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Failed to fetch - likely rate limited (429)')
      throw new Error('RATE_LIMITED')
    }
    
    // Check if the error message contains 429 (for net::ERR_FAILED 429 cases)
    if (error instanceof Error && (error.message.includes('429') || error.message.includes('Too Many Requests'))) {
      console.error('Rate limited - detected from error message')
      throw new Error('RATE_LIMITED')
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Request timed out')
      throw new Error('REQUEST_TIMEOUT')
    }
    
    throw error
  }
}
