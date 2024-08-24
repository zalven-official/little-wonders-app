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
        <p class="m-2 text-sm">{{ !isBionic ? 'Convert to Bionic' : 'Back to Normal' }}</p>
      </div>

      <input type="file" class="file-input file-input-bordered file-input-primary w-full mb-5"
        @change="handleFileChange" accept="image/*" />

      <div ref="generatedResult">
        <div class="capitalize text-xs opacity-50"><strong>Date: </strong> {{ readableDateTime(story.published) }}</div>
        <div class="capitalize"><strong>GENERATED SILENT STORY </strong></div>
        <div class="capitalize"> <strong>Test type: </strong> {{ story.testType }}</div>
        <div class="capitalize"> <strong>Grade Level: </strong> {{ story.gradeLevel }}</div>
        <div class="capitalize"> <strong>Title: </strong>{{ story.title }}</div>
        <div class="capitalize text-xs opacity-50"><strong>Number of words: </strong>
          {{ numberOfWords }}
        </div>


        <div class="flex justify-center items-center m-5">
          <div class="avatar placeholder rounded-xl shadow">
            <div class="w-32 rounded-xl">
              <img :src="story.poster" />
            </div>
          </div>
        </div>


        <TipTapEditor v-model="story.story" :is-bionic="isBionic"></TipTapEditor>
        <strong>Questions: </strong>
        <TipTapEditor v-model="story.questions" :is-bionic="isBionic"></TipTapEditor>
      </div>

      <div class="my-5">
        <button class="btn btn-primary my-4" type="button" @click="generateSilentQuestionnaire" v-if="result?.story">
          <SparklesIcon class="w-5" />
          Generate Questionnaire
        </button>


      </div>

      <div class="mt-14">
        <button class="btn btn-outline btn-primary my-2 w-full" type="button" @click="exportStory">
          <DownloadIcon class="w-5" />
          Save as Docx
        </button>

        <button class="btn btn-primary my-2 w-full" type="button" @click="saveStory">
          <SaveIcon class="w-5" />
          Save Story
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import TipTapEditor from '@/components/global/TipTapEditor.vue';
import { useThemeStore } from '@/store/ui/theme.store'
import { Level, TestType, IStory } from '@/services/types';
import { toast } from 'vue3-toastify';
import { SparklesIcon, SaveIcon, DownloadIcon } from 'lucide-vue-next';
import { useSilentStoryGeneratorStore } from '@/store/story/silent.story.generator';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { exportFile, readableDateTime, countWords } from '@/lib';

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:isLoading', value: boolean): void;
}>()

const silentStoryGenerator = useSilentStoryGeneratorStore()

const themeStore = useThemeStore()

const {
  backgroundOpacity,
  backgroundBlur,
} = storeToRefs(themeStore)


const { story } = storeToRefs(silentStoryGenerator)
const result = ref<IStory>()
const isBionic = ref(false)
const generatedResult = ref<HTMLElement>()
const numberOfWords = computed(() => countWords(story.value.story))

onMounted(() => {
  story.value.isPhilIri = false
})

async function generateStory(): Promise<void> {
  emit('update:isLoading', true)
  try {
    result.value = await silentStoryGenerator.generateSilentStory()
    toast.success("Successfully generating the story")
  } catch (e) {
    toast.error(`Something Wrong Generating the Story: ${e}`)
  } finally {
    emit('update:isLoading', false)
  }
}

async function generateSilentQuestionnaire(): Promise<void> {
  emit('update:isLoading', true)
  try {
    result.value = await silentStoryGenerator.generateSilentQuestionnaire()
    toast.success("Successfully generating the questionnaires")
  } catch (e) {
    toast.error("Something Wrong Generating the questionnaires")
  } finally {
    emit('update:isLoading', false)
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      story.value.poster = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please select an image file.');
    story.value.poster = ''
  }
}

// Export ---------------------------------------
async function exportStory(): Promise<void> {
  emit('update:isLoading', true)
  try {
    if (generatedResult.value) {
      await exportFile(generatedResult.value, `${story.value.title}-SILENT`)
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