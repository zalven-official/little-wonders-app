<template>
  <MainLayout>
    <button class="btn btn-primary m-5 shadow btn-sm" @click="navigateToStoryGenerator">
      <PlusIcon class="w-5" /> Add Story
    </button>
    <div class="flex flex-col p-5 items-center justify-center">
      <div class="mb-10">
        <div class="join w-full">
          <select v-model="stories.filters.gradeLevel" class="select join-item w-full select-sm rounded-b-none">
            <option disabled selected>Grade</option>
            <option>Level</option>
            <option>Grade 4</option>
            <option>Grade 5</option>
            <option>Grade 6</option>
          </select>
          <select v-model="stories.filters.testType" class="select join-item  w-full select-sm rounded-b-none">
            <option disabled selected>Type</option>
            <option>Type</option>
            <option>Post Test</option>
            <option>Pre Test</option>
            <option>Story</option>
          </select>
          <select v-model="stories.filters.readingMode" class="select join-item  w-full select-sm rounded-b-none">
            <option disabled selected>Mode</option>
            <option>Mode</option>
            <option>Silent Reading</option>
            <option>Oral Reading</option>
          </select>
          <select v-model="stories.filters.date" class="select join-item w-full select-sm rounded-br-none">
            <option disabled selected>Date</option>
            <option>Date</option>
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
          <p class="text-xs mt-2">{{ value.description }}</p>
          <div class="capitalize badge badge-primary m-1 badge-xs p-2">{{ value.gradeLevel }}</div>
          <div class="capitalize badge badge-secondary m-1 badge-xs p-2">{{ value.testType }}</div>
          <div class="capitalize badge badge-accent m-1 badge-xs p-2">{{ value.readingMode }}</div>
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
import { PlusIcon } from 'lucide-vue-next';
import { useIonRouter } from '@ionic/vue';

const ionRouter = useIonRouter();
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

function navigateToStoryGenerator() {
  ionRouter.navigate('/story-generated', 'forward', 'replace');
}


</script>
