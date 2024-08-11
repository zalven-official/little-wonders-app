<template>
  <div>
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
          <span class="label-text">Prompt</span>
        </div>
        <input v-model="story.prompt" type="text" placeholder="Read and find out..."
          class="input input-bordered w-full" />
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

        <strong v-if="story.literalQuestions">Literal Questions </strong>
        <TipTapEditor v-model="story.literalQuestions" :is-bionic="isBionic"></TipTapEditor>

        <strong v-if="story.interpretiveQuestions">Interpretive Questions </strong>
        <TipTapEditor v-model="story.interpretiveQuestions" :is-bionic="isBionic"></TipTapEditor>

        <strong v-if="story.appliedQuestions">Applied Questions </strong>
        <TipTapEditor v-model="story.appliedQuestions" :is-bionic="isBionic"></TipTapEditor>

        <div class="avatar shadow-md rounded-lg" v-if="story.poster">
          <div class="w-36 rounded-xl">
            <img :src="story.poster" />
          </div>
        </div>
      </div>



      <div class="my-5">
        <button class="btn btn-primary my-4" type="button" @click="generateLiteralQuestions" v-if="result?.story">
          <SparklesIcon class="w-5" />
          Generate Literal Questionnaire
        </button>


        <button class="btn btn-primary my-4" type="button" @click="generateInterpretiveQuestions" v-if="result?.story">
          <SparklesIcon class="w-5" />
          Generate Interpretive Questionnaire
        </button>

        <button class="btn btn-primary my-4" type="button" @click="generateAppliedQuestions" v-if="result?.story">
          <SparklesIcon class="w-5" />
          Generate Applied Questionnaire
        </button>

        <button class="btn btn-primary my-4" type="button" @click="generatePoster" v-if="result?.story">
          <SparklesIcon class="w-5" />
          Generate Poster
        </button>
      </div>

      <div class="mt-14">
        <button class="btn btn-outline btn-primary my-2 w-full" type="button" @click="exportStory">
          <DownloadIcon class="w-5" />
          Save as Docx
        </button>

        <button class="btn btn-primary my-2 w-full" type="button" @click="saveStory" disabled>
          <SaveIcon class="w-5" />
          Story - Maintenance
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import TipTapEditor from '@/components/global/TipTapEditor.vue';
import { SparklesIcon, SaveIcon, DownloadIcon } from 'lucide-vue-next';
import { useThemeStore } from '@/store/ui/theme.store'
import { useOralStoryGeneratorStore } from '@/store/story/index'
import { storeToRefs } from 'pinia';
import { IStory, Level, TestType } from '@/services/types';
import { toast } from 'vue3-toastify';
import { ref } from 'vue';
import { exportFile } from '@/lib';
const themeStore = useThemeStore()

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

const {
  backgroundOpacity,
  backgroundBlur,
} = storeToRefs(themeStore)

const oralStoryGenerator = useOralStoryGeneratorStore()

const emit = defineEmits<{
  (e: 'update:isLoading', value: boolean): void;
}>()


const { story } = storeToRefs(oralStoryGenerator)

const result = ref<IStory>()
const isBionic = ref(false)
const generatedResult = ref<HTMLElement>()


async function generateStory(): Promise<void> {
  emit('update:isLoading', true)
  try {
    result.value = await oralStoryGenerator.generateOralStory()
    toast.success("Successfully generating the story")
  } catch (e) {
    toast.error(`Something Wrong Generating the Story: ${e}`)
  } finally {
    emit('update:isLoading', false)
  }
}

async function generateLiteralQuestions(): Promise<void> {
  emit('update:isLoading', true)
  try {
    result.value = await oralStoryGenerator.generateLiteralQuestions()
    toast.success("Successfully generating the literal questionnaires")
  } catch (e) {
    toast.error("Something Wrong Generating the literal questionnaires")
  } finally {
    emit('update:isLoading', false)
  }
}

async function generateInterpretiveQuestions(): Promise<void> {
  emit('update:isLoading', true)
  try {
    result.value = await oralStoryGenerator.generateInterpretiveQuestions()
    toast.success("Successfully generating the interpretive questionnaires")
  } catch (e) {
    toast.error("Something Wrong Generating the interpretive questionnaires")
  } finally {
    emit('update:isLoading', false)
  }
}

async function generateAppliedQuestions(): Promise<void> {
  emit('update:isLoading', true)
  try {
    result.value = await oralStoryGenerator.generateAppliedQuestions()
    toast.success("Successfully generating the applied questionnaires")
  } catch (e) {
    toast.error("Something Wrong Generating the applied questionnaires")
  } finally {
    emit('update:isLoading', false)
  }
}

async function generatePoster(): Promise<void> {
  emit('update:isLoading', true)
  try {
    result.value = await oralStoryGenerator.generatePoster()
    toast.success("Successfully generating the poster")
  } catch (e) {
    toast.error(`Something Wrong Generating the poster ${e}`)
  } finally {
    emit('update:isLoading', false)
  }
}

// Export ---------------------------------------
async function exportStory(): Promise<void> {
  emit('update:isLoading', true)
  try {
    if (generatedResult.value) {
      await exportFile(generatedResult.value, `${story.value.title}-ORAL`)
      toast.success("Successfully exporting the story")
    }
  } catch (e) {
    toast.error(`Something Wrong Exporting the Story ${JSON.stringify(e)}`)
  } finally {
    emit('update:isLoading', false)
  }
}

async function saveStory(): Promise<void> {
  emit('update:isLoading', true)
  try {
    await oralStoryGenerator.saveStory()
    toast.success("Successfully saving the story")
  } catch (e) {
    toast.error("Something Wrong Saving the Story")
  } finally {
    emit('update:isLoading', false)
  }
}


</script>