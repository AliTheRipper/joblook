<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-3">
      <TransitionGroup
        name="toast"
        tag="div"
        class="space-y-3"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="getToastClasses(toast.type)"
          class="max-w-sm w-full shadow-lg rounded-xl pointer-events-auto flex items-start p-4 backdrop-blur-sm border"
        >
          <!-- Icon -->
          <div class="flex-shrink-0 mr-3">
            <div :class="getIconClasses(toast.type)" class="w-8 h-8 rounded-lg flex items-center justify-center">
              <!-- Success Icon -->
              <svg v-if="toast.type === 'success'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              
              <!-- Error Icon -->
              <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              
              <!-- Warning Icon -->
              <svg v-else-if="toast.type === 'warning'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              
              <!-- Info Icon -->
              <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between">
              <div>
                <p :class="getTitleClasses(toast.type)" class="text-sm font-semibold">
                  {{ getTypeTitle(toast.type) }}
                </p>
                <p :class="getMessageClasses(toast.type)" class="text-sm mt-1 leading-relaxed">
                  {{ toast.message }}
                </p>
              </div>
              
              <!-- Close Button -->
              <button
                @click="removeToast(toast.id)"
                :class="getCloseButtonClasses(toast.type)"
                class="ml-3 flex-shrink-0 rounded-lg p-1.5 hover:scale-110 transition-all duration-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Progress Bar -->
          <div v-if="toast.duration" class="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-xl overflow-hidden">
            <div
              class="h-full transition-all duration-100 ease-linear"
              :class="getProgressBarClasses(toast.type)"
              :style="{ width: `${getProgress(toast)}%` }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
  createdAt: number
}

const toasts = ref<Toast[]>([])
let interval: NodeJS.Timeout | null = null

const addToast = (toast: Omit<Toast, 'id' | 'createdAt'>) => {
  const newToast: Toast = {
    ...toast,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: Date.now(),
    duration: toast.duration || 5000
  }
  
  toasts.value.push(newToast)
  
  if (newToast.duration) {
    setTimeout(() => {
      removeToast(newToast.id)
    }, newToast.duration)
  }
}

const removeToast = (id: string) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const getProgress = (toast: Toast) => {
  if (!toast.duration) return 0
  const elapsed = Date.now() - toast.createdAt
  const progress = (elapsed / toast.duration) * 100
  return Math.min(progress, 100)
}

const getToastClasses = (type: Toast['type']) => {
  const baseClasses = 'relative overflow-hidden'
  const typeClasses = {
    success: 'bg-white/95 border-green-200',
    error: 'bg-white/95 border-red-200',
    warning: 'bg-white/95 border-yellow-200',
    info: 'bg-white/95 border-blue-200'
  }
  return `${baseClasses} ${typeClasses[type]}`
}

const getIconClasses = (type: Toast['type']) => {
  const classes = {
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    error: 'bg-gradient-to-r from-red-500 to-rose-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-amber-500',
    info: 'bg-gradient-to-r from-blue-500 to-indigo-500'
  }
  return classes[type]
}

const getTitleClasses = (type: Toast['type']) => {
  const classes = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  }
  return classes[type]
}

const getMessageClasses = (type: Toast['type']) => {
  const classes = {
    success: 'text-green-700',
    error: 'text-red-700',
    warning: 'text-yellow-700',
    info: 'text-blue-700'
  }
  return classes[type]
}

const getCloseButtonClasses = (type: Toast['type']) => {
  const classes = {
    success: 'text-green-600 hover:bg-green-100',
    error: 'text-red-600 hover:bg-red-100',
    warning: 'text-yellow-600 hover:bg-yellow-100',
    info: 'text-blue-600 hover:bg-blue-100'
  }
  return classes[type]
}

const getProgressBarClasses = (type: Toast['type']) => {
  const classes = {
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    error: 'bg-gradient-to-r from-red-500 to-rose-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-amber-500',
    info: 'bg-gradient-to-r from-blue-500 to-indigo-500'
  }
  return classes[type]
}

const getTypeTitle = (type: Toast['type']) => {
  const titles = {
    success: 'Success!',
    error: 'Error',
    warning: 'Warning',
    info: 'Info'
  }
  return titles[type]
}

onMounted(() => {
  interval = setInterval(() => {
    // Force reactivity update for progress bars
    toasts.value = [...toasts.value]
  }, 100)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})

// Expose methods for use in composables
defineExpose({
  addToast,
  removeToast
})
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>