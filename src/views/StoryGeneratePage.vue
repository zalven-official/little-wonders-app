<template>
  <MainLayout>
    <div class="my-10 p-8 bg-white backdrop-blur-sm">
      <p class="font-bold text-lg text-center w-full flex items-center justify-center">
        <SparklesIcon class="w-5 mr-2 " /> Generate Phil Iri Story
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

        <select v-model="story.level" class="select select-bordered w-full ">
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

      <button class="btn btn-primary my-4" type="button" @click="storyGenerator.generateStory">
        <SparklesIcon class="w-5" />
        Generate Story
      </button>



      <!-- Pretest -->
      <div>
        <div v-html="story.story" class="border p-2 rounded"></div>
        <label class="form-control w-full my-5">
          <div class="label">
            <span class="label-text">Number of Questions to be generated</span>
          </div>
          <div class="join flex w-full">
            <input type="number" v-model="questionSize" class="input input-bordered w-16 join-item" />
            <button class="btn btn-outline btn-primary join-item" type="button"
              @click="storyGenerator.generateQuestion(questionSize)">
              <SparklesIcon class="w-5" /> Generate Question
            </button>
          </div>
          <div class="form-control ">
            <label class="flex py-2">
              <input type="checkbox" v-model="story.showAnswer" class="checkbox" />
              <span class="label-text ml-3">Show Answers</span>
            </label>
          </div>
        </label>
        <div v-for="(value, index) in story.questions" :key="index" class="mb-5 flex w-full">
          <button class="btn btn-sm btn-error mr-2" @click="storyGenerator.deleteQuestion(value)" type="button">
            <TrashIcon class="w-4" />
          </button>
          <div class="w-full">
            <p class="text-sm" v-if="story.showAnswer"> <strong> Answer: </strong>
              <input v-model="value.answer" />
            </p>
            <p class="flex w-full">
              {{ `${index + 1}.) ` }}
              <textarea class="w-full" v-model="value.description" />
            </p>
            <p class="text-sm" v-for="(question, index) in value.options" :key="index">
              {{ question }}
            </p>
          </div>
        </div>
      </div>
    </form>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue';
import { useThemeStore } from '@/store/ui/theme.store'
import { SparklesIcon, TrashIcon } from 'lucide-vue-next';
import { useStoryGeneratorStore, Level, TestType } from '@/store/story/story.generator';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const storyGenerator = useStoryGeneratorStore()
const themeStore = useThemeStore()


const {
  backgroundOpacity,
  backgroundBlur,
} = storeToRefs(themeStore)
const { story } = storeToRefs(storyGenerator)

const questionSize = ref(5)
watch([questionSize], ([val]) => {
  if (val > 10) {
    questionSize.value = 10
  }
})
</script>