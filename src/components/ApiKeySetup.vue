<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Main Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/25">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">
            Setup SerpAPI Key
          </h1>
          <p class="text-gray-600 leading-relaxed">
            Enter your SerpAPI key to unlock powerful LinkedIn profile searching
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <label for="apiKey" class="block text-sm font-semibold text-gray-700">
              SerpAPI Key
            </label>
            <div class="relative">
              <input
                id="apiKey"
                v-model="apiKey"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your SerpAPI key"
                class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
                :disabled="isValidating"
                :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': hasError }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                :disabled="isValidating"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
            <p v-if="hasError" class="text-sm text-red-600 flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Invalid API key. Please check and try again.
            </p>
          </div>

          <button
            type="submit"
            :disabled="!apiKey.trim() || isValidating"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center"
          >
            <LoadingSpinner v-if="isValidating" size="sm" class="mr-2" />
            <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{ isValidating ? 'Validating Key...' : 'Validate & Continue' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500 font-medium">Need an API key?</span>
          </div>
        </div>

        <!-- Sign up link -->
        <div class="text-center">
          <a
            href="https://serpapi.com/users/sign_up"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200 group"
          >
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create Free SerpAPI Account
            <svg class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="mt-6 grid grid-cols-2 gap-3">
        <div class="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">100</div>
            <div class="text-xs text-gray-600 font-medium">Free Searches</div>
          </div>
        </div>
        <div class="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">30s</div>
            <div class="text-xs text-gray-600 font-medium">Setup Time</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SearchService } from '@/services/searchService'
import { useToast } from '@/composables/useToast'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const emit = defineEmits<{
  apiKeyValidated: [apiKey: string]
}>()

const apiKey = ref('')
const isValidating = ref(false)
const showPassword = ref(false)
const hasError = ref(false)
const toast = useToast()

const handleSubmit = async () => {
  if (!apiKey.value.trim()) return

  isValidating.value = true
  hasError.value = false
  
  try {
    const isValid = await SearchService.validateApiKey(apiKey.value.trim())
    
    if (isValid) {
      toast.success('🎉 API key validated successfully!')
      emit('apiKeyValidated', apiKey.value.trim())
    } else {
      hasError.value = true
      toast.error('Invalid API key. Please check and try again.')
    }
  } catch (error) {
    console.error('API key validation error:', error)
    hasError.value = true
    toast.error('Failed to validate API key. Please try again.')
  } finally {
    isValidating.value = false
  }
}
</script>