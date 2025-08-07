<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
      <div class="flex items-center">
        <div class="bg-white/20 rounded-xl p-2 mr-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-bold text-white">
            Candidate Search Criteria
          </h2>
          <p class="text-blue-100 text-sm mt-1">
            Define your ideal candidate profile
          </p>
        </div>
      </div>
    </div>

    <!-- Form Content -->
    <div class="p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Job Title -->
          <div class="space-y-2">
            <label for="jobTitle" class="block text-sm font-semibold text-gray-700">
              Job Title *
            </label>
            <div class="relative">
              <input
                id="jobTitle"
                v-model="form.jobTitle"
                type="text"
                placeholder="e.g., Senior Software Engineer"
                class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                required
              />
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6l-3.243 3.243a6 6 0 01-8.485 0L1 10V4h15z M9 7h6m-6 4h6"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div class="space-y-2">
            <label for="skills" class="block text-sm font-semibold text-gray-700">
              Skills *
            </label>
            <div class="relative">
              <input
                id="skills"
                v-model="form.skills"
                type="text"
                placeholder="e.g., React, TypeScript, Node.js"
                class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                required
              />
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
            </div>
            <p class="text-xs text-gray-500 flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Separate multiple skills with commas
            </p>
          </div>

          <!-- Experience -->
          <div class="space-y-2">
            <label for="experience" class="block text-sm font-semibold text-gray-700">
              Experience Level
            </label>
            <div class="relative">
              <input
                id="experience"
                v-model="form.experience"
                type="text"
                placeholder="e.g., Senior, 5+ years"
                class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
              />
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div class="space-y-2">
            <label for="location" class="block text-sm font-semibold text-gray-700">
              Location
            </label>
            <div class="relative">
              <input
                id="location"
                v-model="form.location"
                type="text"
                placeholder="e.g., San Francisco, CA"
                class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
              />
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Summary -->
        <div v-if="isFormValid" class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <h3 class="text-sm font-semibold text-blue-900 mb-2 flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Search Preview
          </h3>
          <p class="text-sm text-blue-700">
            Looking for <span class="font-semibold">{{ form.jobTitle }}</span> 
            with <span class="font-semibold">{{ form.skills }}</span> skills
            <span v-if="form.experience">, <span class="font-semibold">{{ form.experience }}</span> experience</span>
            <span v-if="form.location"> in <span class="font-semibold">{{ form.location }}</span></span>
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 pt-6 border-t border-gray-100">
          <button
            type="submit"
            :disabled="!isFormValid || isLoading"
            class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center"
          >
            <LoadingSpinner v-if="isLoading" size="sm" class="mr-2" />
            <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            {{ isLoading ? 'Searching Profiles...' : 'Search Candidates' }}
          </button>

          <button
            type="button"
            @click="clearForm"
            class="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Clear Form
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CandidateProfile } from '../types'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

interface Props {
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: false
})

const emit = defineEmits<{
  search: [profile: CandidateProfile]
}>()

const form = ref<CandidateProfile>({
  jobTitle: '',
  skills: '',
  experience: '',
  location: ''
})

const isFormValid = computed(() => {
  return form.value.jobTitle.trim() && form.value.skills.trim()
})

const handleSubmit = () => {
  if (!isFormValid.value) return
  emit('search', { ...form.value })
}

const clearForm = () => {
  form.value = {
    jobTitle: '',
    skills: '',
    experience: '',
    location: ''
  }
}
</script>