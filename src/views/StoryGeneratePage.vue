<template>
  <MainLayout :is-loading="isLoading">
    <div class="my-10 p-8 bg-white backdrop-blur-sm">
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
    <form
      :class="` card w-full bg-base-100 bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value} shadow-xl my-2 p-5 overflow-y-auto`">

      <label class="form-control w-full my-2">
        <div class="label">
          <span class="label-text">Students' Grade Level</span>
        </div>
        <select v-model="story.gradeLevel" class="select select-bordered w-full ">
          <option :value="Level.GRADE_4">Grade 4</option>
          <option :value="Level.GRADE_5">Grade 5</option>
          <option :value="Level.GRADE_6">Grade 6</option>
        </select>
      </label>


      <label class="form-control w-full my-2">
        <div class="label">
          <span class="label-text">Test Type</span>
        </div>
        <select v-model="story.testType" class="select select-bordered w-full ">
          <option :value="TestType.PRETEST">Pre Test</option>
          <option :value="TestType.POSTTEST">Post Test</option>
          <option :value="TestType.STORY">Story</option>
        </select>
      </label>
      <label class="form-control w-full my-2">
        <div class="label">
          <span class="label-text">Story Title</span>
        </div>
        <input v-model="story.title" type="text" placeholder="Type your story title..."
          class="input input-bordered w-full" />
      </label>
      <label class="form-control w-full my-2">
        <div class="label">
          <span class="label-text">Story Description</span>
        </div>
        <textarea class="textarea textarea-bordered" v-model="story.description"
          placeholder="Once upon a time in a land far, far away..." />
      </label>

      <button class="btn btn-primary my-4" type="button" @click="generateStory">
        <SparklesIcon class="w-5" />
        Generate Story
      </button>

    </form>

    <div v-if="result"
      :class="` card w-full bg-base-100 bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value} shadow-xl my-2 p-5 overflow-y-auto`">
      <div class="shadow flex items-center m-5 rounded-lg">
        <input type="checkbox" class="m-2 toggle toggle-success" v-model="isBionic" />
        <p class="m-2 text-sm">{{ !isBionic ? 'Convert to Bionic' : 'Normal' }}</p>

      </div>

      <div ref="generatedResult">
        <TipTapEditor v-model="story.title" :is-bionic="isBionic"></TipTapEditor>
        <TipTapEditor v-model="story.story" :is-bionic="isBionic"></TipTapEditor>
        <TipTapEditor v-model="story.questions" :is-bionic="isBionic"></TipTapEditor>
        <div class="avatar shadow-md rounded-lg" v-if="story.poster">
          <div class="w-36 rounded-xl">
            <img :src="story.poster" />
          </div>
        </div>
      </div>


      <div class="my-5">
        <button class="btn btn-primary my-4" type="button" @click="generateOralQuestionnaire"
          v-if="result?.story && !result?.questions">
          <SparklesIcon class="w-5" />
          Generate Questionnaire
        </button>

        <button class="btn btn-primary my-4" type="button" @click="generatePoster"
          v-if="result?.story && result?.questions">
          <SparklesIcon class="w-5" />
          Generate Poster
        </button>
      </div>

      <div class="mt-14">
        <button class="btn btn-outline btn-primary my-2 w-full" type="button" @click="exportStory">
          <DownloadIcon class="w-5" />
          Save as Docx
        </button>

        <button class="btn btn-primary my-2 w-full" type="button" @click="saveStory">
          <SaveIcon class="w-5" />
          Story
        </button>
      </div>

    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue';
import TipTapEditor from '@/components/global/TipTapEditor.vue';
import { useThemeStore } from '@/store/ui/theme.store'
import { Level, TestType, IOralStory } from '@/services/types';
import { toast } from 'vue3-toastify';
import { SparklesIcon, SaveIcon, DownloadIcon } from 'lucide-vue-next';
import { useOralStoryGeneratorStore } from '@/store/story/oral_story.generator';

import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const oralStoryGenerator = useOralStoryGeneratorStore()


const themeStore = useThemeStore()


const {
  backgroundOpacity,
  backgroundBlur,
} = storeToRefs(themeStore)

const { story } = storeToRefs(oralStoryGenerator)
const result = ref<IOralStory>()
const isLoading = ref(false)
const isBionic = ref(false)
const generatedResult = ref<HTMLElement>()

async function generateStory(): Promise<void> {
  isLoading.value = true
  try {
    result.value = await oralStoryGenerator.generateOralStory()
    toast.success("Successfully generating the story")
  } catch (e) {
    toast.error(`Something Wrong Generating the Story: ${e}`)
  } finally {
    isLoading.value = false
  }
}

async function generateOralQuestionnaire(): Promise<void> {
  isLoading.value = true
  try {
    result.value = await oralStoryGenerator.generateOralQuestionnaire()
    toast.success("Successfully generating the questionnaires")
  } catch (e) {
    toast.error("Something Wrong Generating the questionnaires")
  } finally {
    isLoading.value = false
  }
}


async function generatePoster(): Promise<void> {
  isLoading.value = true
  try {
    result.value = await oralStoryGenerator.generatePoster()
    toast.success("Successfully generating the poster")
  } catch (e) {
    toast.error(`Something Wrong Generating the poster ${e}`)
  } finally {
    isLoading.value = false
  }
}




// Export ---------------------------------------
async function exportStory(): Promise<void> {
  isLoading.value = true
  try {
    if (generatedResult.value) {
      await oralStoryGenerator.exportStory(generatedResult.value)
      toast.success("Successfully exporting the story")
    }
  } catch (e) {
    toast.error(`Something Wrong Exporting the Story ${e}`)
  } finally {
    isLoading.value = false
  }
}
async function saveStory(): Promise<void> {
  isLoading.value = true
  try {
    await oralStoryGenerator.saveStory()
    toast.success("Successfully saving the story")
  } catch (e) {
    toast.error("Something Wrong Saving the Story")
  } finally {
    isLoading.value = false
  }
}

</script>