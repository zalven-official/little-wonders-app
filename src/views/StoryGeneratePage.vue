<template>
  <MainLayout :is-loading="isLoading">


    <div class="flex items-center rounded-lg justify-center" v-if="!storyId">
      <div class="join grid grid-cols-1 p-5">
        <button class="btn btn-outline w-64 my-2" @click="handleCategory(ReadingMode.ORAL_READING, false)"
          :class="{ 'btn-active': readingType === ReadingMode.ORAL_READING && isPhilIri === false }">
          <SparklesIcon class="w-5" />
          <span class="text-xs"> Generate Oral Reading</span>
          <Mic2Icon class="w-5" />
        </button>

        <button class="btn btn-outline w-64 my-2" @click=" handleCategory(ReadingMode.SILENT_READING, false)"
          :class="{ 'btn-active': readingType === ReadingMode.SILENT_READING && isPhilIri === false }">
          <SparklesIcon class="w-5" />
          <span class="text-xs">Generate Silent Reading</span>
          <GlassesIcon class="w-5" />

        </button>

        <button class="btn btn-outline p-2 m-1" @click="handleCategory(ReadingMode.ORAL_READING, true)"
          :class="{ 'btn-active': readingType === ReadingMode.ORAL_READING && isPhilIri === true }">
          <BookAIcon class="w-5" />
          <span class="text-xs">Phil Iri Oral Reading</span>
          <Mic2Icon class="w-5" />
        </button>

        <button class="btn btn-outline w-64 my-2" @click=" handleCategory(ReadingMode.SILENT_READING, true)"
          :class="{ 'btn-active': readingType === ReadingMode.SILENT_READING && isPhilIri === true }">
          <BookAIcon class="w-5" />
          <span class="text-xs">Phil Iri Silent Reading</span>
          <GlassesIcon class="w-5" />
        </button>

      </div>
    </div>
    <div class="flex items-center rounded-lg justify-center m-5 bg-base-100 p-2 shadow-md" v-else>
      <div class="flex justify-center items-center space-x-4"
        v-if="readingType === ReadingMode.ORAL_READING && isPhilIri === false">
        <SparklesIcon class="w-5" />
        <strong class="text-xs"> Generated Oral Reading</strong>
        <Mic2Icon class="w-5" />
      </div>
      <div class="flex justify-center items-center space-x-4"
        v-if="readingType === ReadingMode.SILENT_READING && isPhilIri === false">
        <SparklesIcon class="w-5" />
        <strong class="text-xs">Generated Silent Reading</strong>
        <GlassesIcon class="w-5" />
      </div>
      <div class="flex justify-center items-center space-x-4"
        v-if="readingType === ReadingMode.ORAL_READING && isPhilIri === true">
        <BookAIcon class="w-5" />
        <strong class="text-xs">Phil Iri Oral Reading</strong>
        <Mic2Icon class="w-5" />
      </div>
      <div class="flex justify-center items-center space-x-4"
        v-if="readingType === ReadingMode.SILENT_READING && isPhilIri === true">
        <BookAIcon class="w-5" />
        <strong class="text-xs">Phil Iri Silent Reading</strong>
        <GlassesIcon class="w-5" />
      </div>
    </div>

    <SilentStory @update:isLoading="handleIsLoadingUpdate" :is-loading="isLoading"
      v-if="readingType === ReadingMode.SILENT_READING && isPhilIri === false && !isFetchingStory" />

    <OralStory @update:isLoading="handleIsLoadingUpdate" :is-loading="isLoading"
      v-if="readingType === ReadingMode.ORAL_READING && isPhilIri === false && !isFetchingStory" />

    <PhilIriSilentStory @update:isLoading="handleIsLoadingUpdate" :is-loading="isLoading"
      v-if="readingType === ReadingMode.SILENT_READING && isPhilIri === true && !isFetchingStory" />

    <PhilIriOralStory @update:isLoading="handleIsLoadingUpdate" :is-loading="isLoading"
      v-if="readingType === ReadingMode.ORAL_READING && isPhilIri === true && !isFetchingStory" />
  </MainLayout>

</template>

<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue';
import SilentStory from '@/components/modules/story/SilentStory.vue'
import OralStory from '@/components/modules/story/OralStory.vue'
import PhilIriOralStory from '@/components/modules/story/PhilIriOralStory.vue'
import PhilIriSilentStory from '@/components/modules/story/PhilIriSilentStory.vue'
import { storeToRefs } from 'pinia';
import { ReadingMode } from '@/services/types'
import { SparklesIcon, BookAIcon, GlassesIcon, Mic2Icon } from 'lucide-vue-next';
import { useSilentStoryGeneratorStore } from '@/store/story/silent.story.generator';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchStoryById } from '@/services/index'
import { useOralStoryGeneratorStore } from '@/store/story';

const isLoading = ref(false)
const isFetchingStory = ref(true)
const readingType = ref<ReadingMode>(ReadingMode.ORAL_READING)
const isPhilIri = ref<boolean>(false)
const route = useRoute();
const storyId = ref(route.params.id as string);


const silentStoryGenerator = useSilentStoryGeneratorStore()
const oralStoryGenerator = useOralStoryGeneratorStore()
onMounted(async () => {
  fetch()
})

onUnmounted(() => {
  resetOral()
  resetSilent()
})

function resetOral() {
  const { story } = storeToRefs(oralStoryGenerator)
  story.value = oralStoryGenerator._normalState()
}

function resetSilent() {
  const { story } = storeToRefs(silentStoryGenerator)
  story.value = silentStoryGenerator._normalState()
}

async function fetch() {
  if (!storyId.value) {
    isFetchingStory.value = false
    return
  }
  isLoading.value = true
  isFetchingStory.value = true
  try {
    const data = await fetchStoryById(storyId.value)
    const responseReadingType = data?.readingMode ?? ReadingMode.ORAL_READING

    const responseIsPhilIri = data?.isPhilIri ?? false
    handleCategory(responseReadingType, responseIsPhilIri)

    if (responseReadingType === ReadingMode.ORAL_READING && data) {

      const { story } = storeToRefs(oralStoryGenerator)
      story.value = data
    }
    if (responseReadingType === ReadingMode.SILENT_READING && data) {

      const { story } = storeToRefs(silentStoryGenerator)
      story.value = data
    }
  } finally {
    isLoading.value = false
    isFetchingStory.value = false
  }

}
const handleIsLoadingUpdate = (value: boolean) => {
  isLoading.value = value;
}

function handleCategory(readingTypeValue: ReadingMode, isPhilIriValue: boolean) {
  readingType.value = readingTypeValue
  isPhilIri.value = isPhilIriValue
}
</script>