<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-16 w-16 text-red-500 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
          Something went wrong
        </h2>
        <p class="text-gray-600 mb-6">
          We encountered an error while processing your request. Please try again or contact support if the problem persists.
        </p>
        
        <div class="space-y-4">
          <button
            @click="goBack"
            class="w-full btn-primary"
          >
            Go Back
          </button>
          
          <button
            @click="goHome"
            class="w-full btn-secondary"
          >
            Go to Home
          </button>
          
          <button
            @click="reloadPage"
            class="w-full text-sm text-gray-500 hover:text-gray-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}

const reloadPage = () => {
  window.location.reload()
}
</script>
