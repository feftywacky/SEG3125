export function isOnline(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true
}

export function setupNetworkListeners(
  onOnline: () => void,
  onOffline: () => void
) {
  if (typeof window === 'undefined') return () => {}

  const handleOnline = () => onOnline()
  const handleOffline = () => onOffline()

  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}

export function getNetworkErrorMessage(error: Error): string {
  if (!isOnline()) {
    return 'No internet connection. Please check your network and try again.'
  }
  
  // Check for rate limiting in various forms
  if (error.message === 'RATE_LIMITED' || 
      error.message.includes('429') || 
      error.message.includes('Too Many Requests') ||
      error.message.includes('ERR_FAILED 429')) {
    return 'Rate limited: Too many requests. Please wait a few minutes before trying again.'
  }
  
  // For Failed to fetch errors, also check if it might be rate limiting
  if (error.message.includes('Failed to fetch')) {
    // This could be a 429 disguised as a network error
    return 'Unable to connect to the server. This might be due to rate limiting. Please wait a few minutes before trying again.'
  }
  
  if (error.message === 'REQUEST_TIMEOUT' || error.name === 'AbortError') {
    return 'Request timed out. Please check your connection and try again.'
  }
  
  if (error.message.includes('HTTP 5')) {
    return 'Server error. The API service is temporarily unavailable.'
  }
  
  return error.message
}
