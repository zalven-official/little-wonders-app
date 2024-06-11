<template>
  <MainLayout>
    <div class="flex flex-col p-5 items-center justify-center">
      <div class="mb-10">
        <div class="join w-full">
          <select v-model="stories.filters.level" class="select join-item w-full select-sm rounded-b-none">
            <option disabled selected>Level</option>
            <option>All</option>
            <option>Grade 1</option>
            <option>Grade 2</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
            <option>Grade 5</option>
            <option>Grade 6</option>
          </select>
          <select v-model="stories.filters.testType" class="select join-item  w-full select-sm rounded-b-none">
            <option disabled selected>Type</option>
            <option>All</option>
            <option>Post Test</option>
            <option>Pre Test</option>
          </select>
          <select v-model="stories.filters.date" class="select join-item w-full select-sm rounded-br-none">
            <option disabled selected>Date</option>
            <option>All</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
        <div class="join w-full">
          <input v-model="stories.filters.search" class="input join-item w-full rounded-t-none"
            placeholder="Search story title" />
          <button @click=" storyStore.search()" class="btn join-item rounded-t-none">Search</button>
        </div>
      </div>

      <div v-for="(value, index) in storyStore.filteredStories" :key="index"
        :class="`flex flex-row card w-full bg-base-100 bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value} shadow-xl my-2`">
        <img :src="value.poster" class="w-40 rounded-md p-3 shadow-sm">
        <div class="p-3">
          <p class="text-sm font-semibold">{{ value.title }}</p>
          <p class="text-xs mt-2">{{ value.subtitle }}</p>
          <p class="text-xs mt-2 space-y-2">
            <span class="capitalize bg-primary text-base-100 w-full rounded p-1 mr-2">{{ value.level }}</span>
            <span class="capitalize bg-secondary w-full rounded p-1  mr-2">{{ value.testType }}</span>
            <span class="capitalize bg-accent w-full rounded p-1  mr-2 ">{{ value.level }}</span>
          </p>
          <p class="text-xs mt-2 opacity-65">{{ readableTime(value.published) }}</p>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue';
import { useStoryStore } from '@/store/story';
import { useThemeStore } from '@/store/ui/theme.store'
import { storeToRefs } from 'pinia';
import { readableTime } from '@/lib'
import { onMounted } from 'vue';

const storyStore = useStoryStore()
const themeStore = useThemeStore()
const { stories } = storeToRefs(storyStore)
const {
  backgroundOpacity,
  backgroundBlur,
} = storeToRefs(themeStore)

onMounted(() => {
  storyStore.search()
})

</script>
