<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Hero Header -->
    <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
      <div class="absolute inset-0 bg-black/10"></div>
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div class="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-300"></div>
        <div class="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-700"></div>
      </div>
      
      <div class="relative container mx-auto px-4 py-16 text-center">
        <div class="max-w-4xl mx-auto">
          <div class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
            <svg class="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span class="text-white font-medium text-sm">AI-Powered Talent Sourcing</span>
          </div>
          
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            LinkedIn Talent
            <span class="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Sourcing
            </span>
          </h1>
          
          <p class="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Find the perfect candidates using our advanced AI-powered LinkedIn profile search. 
            Streamline your recruitment process with intelligent matching and comprehensive analytics.
          </p>
          
          <!-- Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-1">10K+</div>
              <div class="text-blue-200 text-sm">Profiles Searched</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-1">95%</div>
              <div class="text-blue-200 text-sm">Match Accuracy</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-1">2.5x</div>
              <div class="text-blue-200 text-sm">Faster Hiring</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <!-- API Key Setup -->
      <div v-if="!hasApiKey">
        <ApiKeySetup @api-key-validated="handleApiKeyValidated" />
      </div>

      <!-- Main Application -->
      <div v-else class="space-y-8">
        <!-- Status Dashboard -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <!-- Connection Status -->
            <div class="flex items-center space-x-6">
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div class="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-30"></div>
                </div>
                <div>
                  <div class="font-semibold text-gray-900">API Connected</div>
                  <div class="text-sm text-gray-500">SerpAPI Active</div>
                </div>
              </div>
              
              <!-- Rate Limit Display -->
              <div class="bg-gray-50 rounded-xl px-4 py-3 border">
                <div class="text-sm text-gray-600 mb-1">Rate Limit Status</div>
                <div class="flex items-center space-x-3">
                  <div class="flex-1">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="font-medium text-gray-900">{{ rateLimitInfo.remaining }}/{{ rateLimitInfo.limit }}</span>
                      <span :class="getRateLimitColor()" class="font-semibold">
                        {{ getRateLimitPercentage() }}%
                      </span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        :class="getRateLimitBarColor()"
                        class="h-2 rounded-full transition-all duration-500"
                        :style="{ width: `${getRateLimitPercentage()}%` }"
                      ></div>
                    </div>
                  </div>
                  <div v-if="rateLimitInfo.remaining < 10" class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                    Low
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex items-center space-x-4">
              <button
                @click="refreshRateLimit"
                class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title="Refresh rate limit"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </button>
              
              <button
                @click="resetApiKey"
                class="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                </svg>
                Change API Key
              </button>
            </div>
          </div>
        </div>

        <!-- Search Form -->
        <CandidateForm
          :is-loading="isLoading"
          @search="handleSearch"
        />

        <!-- Search Results or Welcome Message -->
        <div v-if="searchResults.length > 0 || hasSearched">
          <SearchResults
            :results="searchResults"
            :last-query="lastSearchQuery"
            :can-load-more="false"
          />
        </div>
        
        <!-- Welcome Dashboard (when no searches yet) -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Quick Start Guide -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <div class="flex items-center mb-6">
              <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-2 mr-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">Quick Start Guide</h3>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                <div>
                  <div class="font-semibold text-gray-900">Define Job Requirements</div>
                  <div class="text-sm text-gray-600">Enter the job title and required skills</div>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                <div>
                  <div class="font-semibold text-gray-900">Set Preferences</div>
                  <div class="text-sm text-gray-600">Add experience level and location filters</div>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                <div>
                  <div class="font-semibold text-gray-900">Search & Review</div>
                  <div class="text-sm text-gray-600">Get AI-matched profiles with compatibility scores</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Features Overview -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <div class="flex items-center mb-6">
              <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-2 mr-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">Key Features</h3>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <div class="font-semibold text-gray-900">AI-Powered Matching</div>
                  <div class="text-sm text-gray-600">Intelligent compatibility scoring</div>
                </div>
              </div>
              
              <div class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <div class="font-semibold text-gray-900">Real-time Search</div>
                  <div class="text-sm text-gray-600">Live LinkedIn profile discovery</div>
                </div>
              </div>
              
              <div class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <div class="font-semibold text-gray-900">Advanced Filtering</div>
                  <div class="text-sm text-gray-600">Skills, experience, and location filters</div>
                </div>
              </div>
              
              <div class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <div class="font-semibold text-gray-900">Export & Share</div>
                  <div class="text-sm text-gray-600">Save and share candidate profiles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { CandidateProfile, SearchResult, ApiError, RateLimitInfo } from '../types'
import { SearchService } from '../services/searchService'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { useToast } from '@/composables/useToast'

import ApiKeySetup from '@/components/ApiKeySetup.vue'
import CandidateForm from '@/components/CandidateForm.vue'
import SearchResults from '@/components/SearchResults.vue'

// State
const router = useRouter()
const [storedApiKey, setStoredApiKey] = useLocalStorage('serpapi_key', '')
const hasApiKey = ref(false)
const isLoading = ref(false)
const searchResults = ref<SearchResult[]>([])
const lastSearchQuery = ref('')
const hasSearched = ref(false)
const rateLimitInfo = ref<RateLimitInfo>({
  remaining: 100,
  resetTime: Date.now() + 3600000,
  limit: 100
})

const toast = useToast()

// Methods
const handleApiKeyValidated = (apiKey: string) => {
  setStoredApiKey(apiKey)
  hasApiKey.value = true
}

const resetApiKey = () => {
  setStoredApiKey('')
  hasApiKey.value = false
  searchResults.value = []
  hasSearched.value = false
  toast.info('API key cleared. Please set up a new key to continue.')
}

const refreshRateLimit = () => {
  updateRateLimitInfo()
  toast.success('Rate limit information refreshed')
}

const getRateLimitPercentage = () => {
  return Math.round((rateLimitInfo.value.remaining / rateLimitInfo.value.limit) * 100)
}

const getRateLimitColor = () => {
  const percentage = getRateLimitPercentage()
  if (percentage >= 50) return 'text-green-600'
  if (percentage >= 20) return 'text-yellow-600'
  return 'text-red-600'
}

const getRateLimitBarColor = () => {
  const percentage = getRateLimitPercentage()
  if (percentage >= 50) return 'bg-gradient-to-r from-green-500 to-emerald-500'
  if (percentage >= 20) return 'bg-gradient-to-r from-yellow-500 to-amber-500'
  return 'bg-gradient-to-r from-red-500 to-rose-500'
}

const handleSearch = async (profile: CandidateProfile) => {
  if (!storedApiKey.value) {
    toast.error('API key not found')
    return
  }

  isLoading.value = true
  hasSearched.value = true
  
  try {
    const query = SearchService.buildSearchQuery(profile)
    lastSearchQuery.value = query
    
    const results = await SearchService.searchLinkedInProfiles(profile, storedApiKey.value)
    searchResults.value = results
    
    if (results.length === 0) {
      toast.info('No profiles found. Try adjusting your search criteria.')
    } else {
      toast.success(`🎉 Found ${results.length} candidate profiles!`)
    }
    
    // Update rate limit info after search
    updateRateLimitInfo()
  } catch (error: any) {
    console.error('Search error:', error)
    
    // Handle specific API errors
    if (error.code) {
      const apiError = error as ApiError
      
      switch (apiError.code) {
        case 'RATE_LIMIT_EXCEEDED':
          toast.error('Rate limit exceeded. Please wait before making more requests.')
          router.push({
            name: 'rate-limit',
            query: { retryAfter: apiError.retryAfter?.toString() || '60' }
          })
          break
          
        case 'INVALID_API_KEY':
          toast.error('Invalid API key. Please check your credentials.')
          resetApiKey()
          break
          
        case 'ACCESS_FORBIDDEN':
          toast.error('Access forbidden. Please check your API permissions.')
          break
          
        case 'SERVICE_UNAVAILABLE':
          toast.error('Search service temporarily unavailable. Please try again later.')
          break
          
        case 'TIMEOUT':
          toast.error('Request timeout. Please try again.')
          break
          
        default:
          toast.error(apiError.message || 'Search failed. Please try again.')
          break
      }
    } else {
      toast.error('Search failed. Please check your API key and try again.')
    }
    
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}

// Initialize
onMounted(() => {
  if (storedApiKey.value) {
    hasApiKey.value = true
  }
  
  // Update rate limit info periodically
  updateRateLimitInfo()
  setInterval(updateRateLimitInfo, 30000) // Update every 30 seconds
})

// Update rate limit information
const updateRateLimitInfo = () => {
  rateLimitInfo.value = SearchService.getRateLimitInfo()
}
</script>
