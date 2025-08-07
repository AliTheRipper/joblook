<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-16 w-16 text-yellow-500 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
          Rate Limit Exceeded
        </h2>
        <p class="text-gray-600 mb-6">
          You've exceeded the API rate limit. Please wait before making more requests.
        </p>
        
        <div v-if="retryAfter" class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-sm text-yellow-800">
            You can try again in <strong>{{ formatTime(retryAfter) }}</strong>
          </p>
          <div class="mt-2">
            <div class="bg-yellow-200 rounded-full h-2">
              <div 
                class="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                :style="{ width: `${(1 - timeRemaining / retryAfter) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
        
        <div class="space-y-4">
          <button
            @click="retry"
            :disabled="timeRemaining > 0"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ timeRemaining > 0 ? `Retry in ${formatTime(timeRemaining)}` : 'Retry Now' }}
          </button>
          
          <button
            @click="goHome"
            class="w-full btn-secondary"
          >
            Go to Home
          </button>
        </div>
        
        <div class="mt-6 text-xs text-gray-500">
          <p>Consider reducing your search frequency or upgrading your API plan for higher limits.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const retryAfter = ref<number>(0)
const timeRemaining = ref<number>(0)
let intervalId: ReturnType<typeof setInterval> | null = null

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
}

const startCountdown = () => {
  if (intervalId) clearInterval(intervalId)
  
  intervalId = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }
  }, 1000)
}

const retry = () => {
  if (timeRemaining.value <= 0) {
    router.back()
  }
}

const goHome = () => {
  router.push('/')
}

onMounted(() => {
  // Get retry time from query params or use default
  const retrySeconds = Number(route.query.retryAfter) || 60
  retryAfter.value = retrySeconds
  timeRemaining.value = retrySeconds
  
  startCountdown()
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
