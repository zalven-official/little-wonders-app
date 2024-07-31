<template>
  <MainLayout :is-loading="isLoading">

    <HeaderCover />
    <div class="flex items-center rounded-lg justify-center">
      <div class="join grid grid-cols-2">
        <button class="join-item btn btn-outline" @click="readingType = ReadingMode.ORAL_READING"
          :class="{ 'btn-active': readingType === ReadingMode.ORAL_READING }">Oral
          Reading</button>
        <button class="join-item btn btn-outline" @click="readingType = ReadingMode.SILENT_READING"
          :class="{ 'btn-active': readingType === ReadingMode.SILENT_READING }">Silent
          Reading</button>
      </div>
    </div>
    <SilentStory @update:isLoading="handleIsLoadingUpdate" :is-loading="isLoading"
      v-if="readingType === ReadingMode.ORAL_READING" />
    <SilentStoryGenerator @update:isLoading="handleIsLoadingUpdate" :is-loading="isLoading"
      v-if="readingType === ReadingMode.SILENT_READING" />
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue';
import HeaderCover from '@/components/modules/story/HeaderCover.vue'
import SilentStory from '@/components/modules/story/SilentStory.vue'
import SilentStoryGenerator from '@/components/modules/story/SilentStoryGenerator.vue'
import { ReadingMode } from '@/services/types'
import { ref } from 'vue';

const isLoading = ref(false)
const readingType = ref<ReadingMode>(ReadingMode.ORAL_READING)
const handleIsLoadingUpdate = (value: boolean) => {
  isLoading.value = value;
}
</script>