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
        </select>
      </label>

      <label class="form-control w-full my-2">
        <div class="label">
          <span class="label-text">Story Title</span>
        </div>
        <input v-model="story.title" type="text" placeholder="Type your story title..."
          class="input input-bordered w-full" />
      </label>

      <div class="shadow flex items-center m-5 rounded-lg">
        <input type="checkbox" class="m-2 toggle toggle-success" v-model="isBionic" />
        <p class="m-2 text-sm">{{ !isBionic ? 'Convert to Bionic' : 'Back to Normal' }}</p>
      </div>

      <div ref="generatedResult">
        <div class="capitalize text-xs opacity-50"><strong>Date: </strong> {{ readableDateTime(story.published) }}</div>
        <div class="capitalize"><strong>GENERATED SILENT STORY </strong></div>
        <div class="capitalize"> <strong>Test type: </strong> {{ story.testType }}</div>
        <div class="capitalize"> <strong>Grade Level: </strong> {{ story.gradeLevel }}</div>
        <div class="capitalize"> <strong>Title: </strong>{{ story.title }}</div>
        <div class="capitalize text-xs opacity-50"><strong>Number of words: </strong>
          {{ numberOfWords }}
        </div>

        <TipTapEditor v-model="story.story" :is-bionic="isBionic"></TipTapEditor>
        <strong>Questions: </strong>
        <TipTapEditor v-model="story.questions" :is-bionic="isBionic"></TipTapEditor>
      </div>

      <button class="btn btn-outline btn-primary my-2 w-full" type="button" @click="exportStory">
        <DownloadIcon class="w-5" />
        Save as Docx
      </button>

      <button class="btn btn-primary my-2 w-full" type="button" @click="saveStory" disabled>
        <SaveIcon class="w-5" />
        Story - Maintenance
      </button>

    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/ui/theme.store'
import { toast } from 'vue3-toastify';
import { SaveIcon, DownloadIcon } from 'lucide-vue-next';
import { useSilentStoryGeneratorStore } from '@/store/story/index'
import { Level, TestType } from '@/services/types';
import { onMounted } from 'vue';
import { exportFile, readableDateTime, countWords } from '@/lib';
import TipTapEditor from '@/components/global/TipTapEditor.vue';

const themeStore = useThemeStore()

const emit = defineEmits<{
  (e: 'update:isLoading', value: boolean): void;
}>()


const {
  backgroundOpacity,
  backgroundBlur,
} = storeToRefs(themeStore)

const silentStoryGenerator = useSilentStoryGeneratorStore()
const generatedResult = ref<HTMLElement>()
const isBionic = ref(false)
const { story } = storeToRefs(silentStoryGenerator)

const numberOfWords = computed(() => countWords(story.value.story))

onMounted(() => {
  story.value.isPhilIri = true
})


// Export ---------------------------------------
async function exportStory(): Promise<void> {
  emit('update:isLoading', true)
  try {
    if (generatedResult.value) {
      await exportFile(generatedResult.value, `${story.value.title}-sile`)
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
    await silentStoryGenerator.saveStory()
    toast.success("Successfully saving the story")
  } catch (e) {
    toast.error("Something Wrong Saving the Story")
  } finally {
    emit('update:isLoading', false)
  }
}

</script>