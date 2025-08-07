<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900">
        Search Results
        <span class="text-sm font-normal text-gray-600 ml-2">
          ({{ results.length }} profiles found)
        </span>
      </h2>
      
      <div class="text-sm text-gray-600">
        Query: <code class="bg-gray-100 px-2 py-1 rounded">{{ lastQuery }}</code>
      </div>
    </div>

    <div v-if="results.length === 0" class="card text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No profiles found</h3>
      <p class="text-gray-600">Try adjusting your search criteria</p>
    </div>

    <div v-else class="grid gap-4">
      <div
        v-for="(result, index) in results"
        :key="index"
        class="card hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-900 mb-1 line-clamp-2">
              {{ result.title }}
            </h3>
            <p class="text-sm text-gray-600 mb-2 line-clamp-3">
              {{ result.snippet }}
            </p>
          </div>
          
          <div class="ml-4 flex flex-col items-end space-y-2">
            <Badge :variant="getScoreVariant(result.matchScore)">
              {{ result.matchScore }}% match
            </Badge>
            <span class="text-xs text-gray-500">
              Position #{{ result.position }}
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-gray-200">
          <a
            :href="result.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View LinkedIn Profile
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
          
          <button
            @click="copyLink(result.link)"
            class="text-gray-500 hover:text-gray-700 p-1"
            title="Copy link"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from '../types'
import { useToast } from '@/composables/useToast'
import Badge from '@/components/ui/Badge.vue'

interface Props {
  results: SearchResult[]
  lastQuery?: string
}

withDefaults(defineProps<Props>(), {
  lastQuery: ''
})

const toast = useToast()

const getScoreVariant = (score: number) => {
  if (score >= 70) return 'success'
  if (score >= 40) return 'warning'
  return 'default'
}

const copyLink = async (link: string) => {
  try {
    await navigator.clipboard.writeText(link)
    toast.success('Link copied to clipboard!')
  } catch (error) {
    toast.error('Failed to copy link')
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>