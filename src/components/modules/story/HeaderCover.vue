<template>
  <div
    :class="`card w-full bg-base-100 my-10 p-8 bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value}`">
    <p class="font-bold text-lg text-center w-full flex items-center justify-center">
      <SparklesIcon class="w-5 mr-2 " /> Generate Phil Iri Story 12
    </p>
    <p class="mt-5 text-xs text-center w-full">
      The Philippine Informal Reading Inventory (Phil-IRI) helps teachers assess students' reading skills. Our app
      supports this by generating personalized stories and questions for different reading levels, making learning fun
      and effective.
    </p>
    <p class="mt-5 text-xs text-center w-full opacity-60">
      BEED 3B - 2024 - 2025
    </p>
  </div>
</template>

<script setup lang="ts">
import { SparklesIcon } from 'lucide-vue-next'
import { useThemeStore } from '@/store/ui/theme.store'
import { storeToRefs } from 'pinia';
const themeStore = useThemeStore()
const {
  backgroundOpacity,
  backgroundBlur,
} = storeToRefs(themeStore)

</script>