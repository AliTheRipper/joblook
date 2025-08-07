import { useRouter } from 'vue-router'
import { useToast } from './useToast'
import type { ApiError } from '../types'

export function useErrorHandler() {
  const router = useRouter()
  const toast = useToast()

  const handleApiError = (error: ApiError | any) => {
    console.error('API Error:', error)
    
    // Handle specific API errors
    if (error.code) {
      const apiError = error as ApiError
      
      switch (apiError.code) {
        case 'RATE_LIMIT_EXCEEDED':
          toast.error('Rate limit exceeded. Please wait before trying again.')
          router.push({
            name: 'rate-limit',
            query: { retryAfter: apiError.retryAfter?.toString() || '60' }
          })
          break
          
        case 'INVALID_API_KEY':
          toast.error('Invalid API key. Please check your credentials.')
          // Could emit an event to reset API key
          break
          
        case 'ACCESS_FORBIDDEN':
          toast.error('Access forbidden. Please check your API permissions.')
          break
          
        case 'SERVICE_UNAVAILABLE':
        case 'SERVER_ERROR':
          toast.error('Service temporarily unavailable. Please try again later.')
          break
          
        case 'TIMEOUT':
          toast.error('Request timeout. Please check your connection and try again.')
          break
          
        case 'NETWORK_ERROR':
          toast.error('Network error. Please check your internet connection.')
          break
          
        default:
          toast.error(apiError.message || 'An unexpected error occurred.')
          break
      }
    } else {
      // Handle generic errors
      toast.error(error.message || 'An unexpected error occurred.')
    }
  }

  const handleNetworkError = () => {
    toast.error('Network error. Please check your internet connection.')
  }

  const handleValidationError = (message: string) => {
    toast.warning(message)
  }

  return {
    handleApiError,
    handleNetworkError,
    handleValidationError
  }
}
