<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="relative">
      <!-- Outer ring -->
      <div
        class="absolute inset-0 rounded-full border-2 border-gray-200"
        :class="spinnerClass"
      ></div>
      <!-- Spinning ring -->
      <div
        class="animate-spin rounded-full border-2 border-transparent border-t-primary-600 border-r-primary-600"
        :class="spinnerClass"
        style="animation-duration: 1s;"
      ></div>
      <!-- Inner dot (for larger spinners) -->
      <div
        v-if="size === 'lg'"
        class="absolute inset-0 flex items-center justify-center"
      >
        <div class="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
      </div>
    </div>
    
    <div v-if="text" class="ml-4 flex flex-col">
      <span class="text-gray-700 font-medium">{{ text }}</span>
      <span v-if="subtitle" class="text-xs text-gray-500 mt-0.5">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  subtitle?: string
  containerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const spinnerClass = computed(() => {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }
  return sizes[props.size]
})
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>