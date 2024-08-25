<template>
  <MainLayout :is-loading="isLoading">
    <button class="btn btn-primary m-5 shadow btn-sm" @click="navigateToStoryGenerator">
      <PlusIcon class="w-5" /> Add Story
    </button>
    <div class="flex flex-col p-5 items-center justify-center">
      <div class="mb-10">
        <div class="bg-base-100 join w-full mb-2">
          <select v-model="stories.filters.isPhilIri" class="select join-item w-full select-sm" @change="search">
            <option :value="undefined">Content</option>
            <option :value="true">Phil Iri Stories</option>
            <option :value="false">AI Generated Stories</option>
          </select>
          <button class="btn btn-outlin btn-sm" @click="clearSearch">
            <BrushIcon class="w-3" />clear search
          </button>
        </div>

        <div class="join w-full ">
          <select v-model="stories.filters.gradeLevel" class="select join-item w-full select-sm rounded-b-none"
            @change="search">
            <option :value="undefined">Grade</option>
            <option :value="Level.GRADE_4">Grade 4</option>
            <option :value="Level.GRADE_5">Grade 5</option>
            <option :value="Level.GRADE_6">Grade 6</option>
          </select>
          <select v-model="stories.filters.testType" class="select join-item  w-full select-sm rounded-b-none"
            @change="search">
            <option :value="undefined">Type</option>
            <option :value="TestType.POSTTEST">Post Test</option>
            <option :value="TestType.PRETEST">Pre Test</option>
          </select>
          <select v-model="stories.filters.readingMode" class="select join-item  w-full select-sm rounded-b-none"
            @change="search">
            <option :value="undefined">Mode</option>
            <option :value="ReadingMode.SILENT_READING">Silent Reading</option>
            <option :value="ReadingMode.ORAL_READING">Oral Reading</option>
            {{ stories.filters.readingMode }}
          </select>
          <select v-model="stories.filters.sort" class="select join-item w-full select-sm rounded-br-none"
            @change="search">
            <option :value="undefined">Date</option>
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>

        </div>
        <div class="join w-full">
          <input v-model="stories.filters.title" class="input join-item w-full rounded-t-none"
            placeholder="Search story title" />
          <button @click="search" class="btn join-item rounded-t-none">
            <SearchIcon class="w-4" /> Search
          </button>
        </div>
      </div>

      <div v-for="(value, index) in storyStore.stories.stories" :key="index"
        :class="`flex flex-row card w-full bg-base-100 bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value} shadow-xl my-2 h-48 min-h-48`">
        <img :src="value.poster" class="w-40 h-40 rounded-md p-3 shadow-sm">
        <div class="p-3">
          <p class="text-sm font-semibold capitalize">{{ value.title }}</p>
          <p class="text-xs mt-2">{{ value.description }}</p>
          <p class="text-xs mt-2 opacity-65 ">{{ readableDateTime(value.published) }}</p>
          <div class="capitalize text-xs opacity-50"><strong>Number of words: </strong>
            {{ countWords(value.story) }}
          </div>

        </div>
        <div class="w-full flex justify-end absolute bottom-0 rounded-b-lg px-2">
          <div class="capitalize badge badge-primary m-1 badge-xs p-2">{{ value.gradeLevel }}</div>
          <div class="capitalize badge badge-accent m-1 badge-xs p-2">{{ value.readingMode }}</div>
          <div class="capitalize badge badge-secondary m-1 badge-xs p-2">{{ value.testType }}</div>
          <div class="capitalize badge badge-info m-1 badge-xs p-2">
            {{ value.isPhilIri ? 'Original' : 'AI Generated' }}
          </div>
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

import { readableDateTime, countWords } from '@/lib';
import { onMounted } from 'vue';
import { PlusIcon, BrushIcon, SearchIcon } from 'lucide-vue-next';
import { useIonRouter } from '@ionic/vue';
import { ReadingMode, TestType, Level } from '@/services/types'
import { ref } from 'vue'

const ionRouter = useIonRouter();
const storyStore = useStoryStore()
const themeStore = useThemeStore()

const { stories } = storeToRefs(storyStore)

const isLoading = ref(false)
const {
  backgroundOpacity,
  backgroundBlur,
} = storeToRefs(themeStore)

onMounted(() => {
  search()
})


async function search() {
  isLoading.value = true
  try {
    await storyStore.search()
  } finally {
    isLoading.value = false
  }
}

async function clearSearch() {
  isLoading.value = true
  try {
    stories.value.filters = storyStore._normalState()
    await storyStore.search()
  } finally {
    isLoading.value = false
  }
}

function navigateToStoryGenerator() {
  ionRouter.navigate('/story-generated', 'forward', 'replace');
}


</script>
