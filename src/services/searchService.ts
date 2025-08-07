import axios, { AxiosError } from 'axios'
import type { 
  CandidateProfile, 
  SearchResult, 
  SerpApiResult, 
  ApiError, 
  RateLimitInfo,
  SearchOptions 
} from '../types'

export class SearchService {
  private static readonly CORS_PROXIES = [
    'https://corsproxy.io/?',
    'https://api.allorigins.win/raw?url=',
    'https://cors-anywhere.herokuapp.com/',
  ]

  private static rateLimitInfo: RateLimitInfo = {
    remaining: 100,
    resetTime: Date.now() + 3600000, // 1 hour from now
    limit: 100
  }

  private static readonly DEFAULT_OPTIONS: SearchOptions = {
    maxResults: 20,
    timeout: 15000,
    retryAttempts: 3
  }

  /**
   * Check if we've hit rate limits
   */
  static checkRateLimit(): void {
    if (this.rateLimitInfo.remaining <= 0 && Date.now() < this.rateLimitInfo.resetTime) {
      const retryAfter = Math.ceil((this.rateLimitInfo.resetTime - Date.now()) / 1000)
      throw this.createApiError('RATE_LIMIT_EXCEEDED', 'Rate limit exceeded', 429, retryAfter)
    }
  }

  /**
   * Update rate limit information from response headers
   */
  static updateRateLimit(headers: any): void {
    if (headers['x-ratelimit-remaining']) {
      this.rateLimitInfo.remaining = parseInt(headers['x-ratelimit-remaining'])
    }
    if (headers['x-ratelimit-reset']) {
      this.rateLimitInfo.resetTime = parseInt(headers['x-ratelimit-reset']) * 1000
    }
    if (headers['x-ratelimit-limit']) {
      this.rateLimitInfo.limit = parseInt(headers['x-ratelimit-limit'])
    }
  }

  /**
   * Create standardized API error
   */
  static createApiError(code: string, message: string, statusCode?: number, retryAfter?: number): ApiError {
    return {
      code,
      message,
      statusCode,
      retryAfter
    }
  }

  /**
   * Handle API errors with proper categorization
   */
  static handleApiError(error: any): never {
    if (error instanceof AxiosError) {
      const status = error.response?.status
      const data = error.response?.data

      switch (status) {
        case 401:
          throw this.createApiError('INVALID_API_KEY', 'Invalid API key', 401)
        case 403:
          throw this.createApiError('ACCESS_FORBIDDEN', 'Access forbidden', 403)
        case 429:
          const retryAfter = error.response?.headers['retry-after'] 
            ? parseInt(error.response.headers['retry-after']) 
            : 60
          throw this.createApiError('RATE_LIMIT_EXCEEDED', 'Rate limit exceeded', 429, retryAfter)
        case 500:
          throw this.createApiError('SERVER_ERROR', 'Internal server error', 500)
        case 502:
        case 503:
        case 504:
          throw this.createApiError('SERVICE_UNAVAILABLE', 'Service temporarily unavailable', status)
        default:
          if (data?.error) {
            throw this.createApiError('API_ERROR', data.error, status)
          }
          throw this.createApiError('NETWORK_ERROR', error.message || 'Network error')
      }
    }

    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      throw this.createApiError('TIMEOUT', 'Request timeout')
    }

    throw this.createApiError('UNKNOWN_ERROR', error.message || 'Unknown error occurred')
  }

  /**
   * Build optimized Google search query for LinkedIn profiles
   */
  static buildSearchQuery(profile: CandidateProfile): string {
    let query = 'site:linkedin.com/in'
    
    // Add job title in quotes for exact match
    if (profile.jobTitle.trim()) {
      query += ` "${profile.jobTitle.trim()}"`
    }
    
    // Split skills and add each as quoted term
    if (profile.skills.trim()) {
      const skillsList = profile.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)
      
      skillsList.forEach(skill => {
        query += ` "${skill}"`
      })
    }
    
    // Add optional fields
    if (profile.location?.trim()) {
      query += ` "${profile.location.trim()}"`
    }
    
    if (profile.experience?.trim()) {
      query += ` "${profile.experience.trim()}"`
    }
    
    return query
  }

  /**
   * Calculate match score based on profile criteria
   */
  static calculateMatchScore(result: any, profile: CandidateProfile): number {
    const text = `${result.title} ${result.snippet}`.toLowerCase()
    let score = 0
    let maxScore = 0
    
    // Job Title Scoring (40% weight)
    const jobTitleWeight = 40
    maxScore += jobTitleWeight
    
    if (profile.jobTitle.trim()) {
      const jobTitleWords = profile.jobTitle.toLowerCase().split(' ')
      const matchedWords = jobTitleWords.filter(word => 
        text.includes(word.toLowerCase())
      )
      score += (matchedWords.length / jobTitleWords.length) * jobTitleWeight
    }
    
    // Skills Scoring (30% weight)
    const skillsWeight = 30
    maxScore += skillsWeight
    
    if (profile.skills.trim()) {
      const skills = profile.skills
        .split(',')
        .map(skill => skill.trim().toLowerCase())
        .filter(skill => skill.length > 0)
      
      const matchedSkills = skills.filter(skill => text.includes(skill))
      score += (matchedSkills.length / skills.length) * skillsWeight
    }
    
    // Experience Scoring (15% weight)
    const experienceWeight = 15
    maxScore += experienceWeight
    
    if (profile.experience?.trim()) {
      if (text.includes(profile.experience.toLowerCase())) {
        score += experienceWeight
      }
    }
    
    // Location Scoring (15% weight)
    const locationWeight = 15
    maxScore += locationWeight
    
    if (profile.location?.trim()) {
      if (text.includes(profile.location.toLowerCase())) {
        score += locationWeight
      }
    }
    
    return Math.round((score / maxScore) * 100)
  }

  /**
   * Validate SerpAPI key with enhanced error handling
   */
  static async validateApiKey(apiKey: string): Promise<boolean> {
    this.checkRateLimit()
    
    const testQuery = 'site:linkedin.com/in "software engineer"'
    const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(testQuery)}&api_key=${apiKey}&num=1`
    
    for (const proxy of this.CORS_PROXIES) {
      try {
        const proxyUrl = proxy + encodeURIComponent(url)
        const response = await axios.get(proxyUrl, { 
          timeout: this.DEFAULT_OPTIONS.timeout 
        })
        
        this.updateRateLimit(response.headers)
        
        // Check if response contains expected structure
        if (response.data && !response.data.error) {
          return true
        }
        
        if (response.data?.error) {
          this.handleApiError({
            response: {
              status: 401,
              data: { error: response.data.error }
            }
          })
        }
      } catch (error: any) {
        // If this is an API error, re-throw it
        if (error.code && error.message) {
          throw error
        }
        console.warn(`Proxy ${proxy} failed:`, error)
        continue
      }
    }
    
    return false
  }

  /**
   * Search LinkedIn profiles using SerpAPI with enhanced error handling and retry logic
   */
  static async searchLinkedInProfiles(
    profile: CandidateProfile, 
    apiKey: string,
    options: Partial<SearchOptions> = {}
  ): Promise<SearchResult[]> {
    const searchOptions = { ...this.DEFAULT_OPTIONS, ...options }
    this.checkRateLimit()
    
    const query = this.buildSearchQuery(profile)
    const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${apiKey}&num=${searchOptions.maxResults}`
    
    let lastError: ApiError | null = null
    let attempt = 0
    
    // Retry logic with exponential backoff
    while (attempt < (searchOptions.retryAttempts || 3)) {
      attempt++
      
      // Try each CORS proxy
      for (const proxy of this.CORS_PROXIES) {
        try {
          const proxyUrl = proxy + encodeURIComponent(url)
          const response = await axios.get<SerpApiResult>(proxyUrl, { 
            timeout: searchOptions.timeout 
          })
          
          this.updateRateLimit(response.headers)
          
          if (response.data?.organic_results) {
            return this.processSearchResults(response.data.organic_results, profile)
          }
          
          if (response.data && (response.data as any).error) {
            this.handleApiError({
              response: {
                status: 400,
                data: { error: (response.data as any).error }
              }
            })
          }
        } catch (error: any) {
          // If this is our custom API error, re-throw immediately
          if (error.code && error.message) {
            throw error
          }
          
          lastError = this.createApiError(
            'PROXY_ERROR', 
            `Proxy ${proxy} failed: ${error.message}`,
            error.response?.status
          )
          console.warn(`Proxy ${proxy} failed (attempt ${attempt}):`, error)
          continue
        }
      }
      
      // If all proxies failed, wait before retrying (exponential backoff)
      if (attempt < (searchOptions.retryAttempts || 3)) {
        const delay = Math.pow(2, attempt) * 1000 // 2s, 4s, 8s
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    
    throw lastError || this.createApiError('ALL_PROXIES_FAILED', 'All proxy services failed after retries')
  }

  /**
   * Get current rate limit information
   */
  static getRateLimitInfo(): RateLimitInfo {
    return { ...this.rateLimitInfo }
  }

  /**
   * Process and filter search results
   */
  private static processSearchResults(
    results: any[], 
    profile: CandidateProfile
  ): SearchResult[] {
    return results
      .filter(result => 
        result.link && 
        result.link.includes('linkedin.com/in/') &&
        result.title &&
        result.snippet
      )
      .map(result => ({
        title: result.title,
        link: result.link,
        snippet: result.snippet,
        position: result.position || 0,
        matchScore: this.calculateMatchScore(result, profile)
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
  }
}