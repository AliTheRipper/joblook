<template>
  <span
    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
    :class="badgeClass"
  >
    <div v-if="showDot" class="w-1.5 h-1.5 rounded-full" :class="dotClass"></div>
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default' | 'premium'
  showDot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showDot: false
})

const badgeClass = computed(() => {
  const variants = {
    success: 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200 shadow-sm',
    warning: 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-200 shadow-sm',
    error: 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200 shadow-sm',
    info: 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm',
    premium: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25',
    default: 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border border-gray-200 shadow-sm'
  }
  return variants[props.variant]
})

const dotClass = computed(() => {
  const dotVariants = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    premium: 'bg-white',
    default: 'bg-gray-500'
  }
  return dotVariants[props.variant]
})
</script>