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


      <div class="shadow flex items-center m-5 rounded-lg">
        <p class="m-2 text-sm">{{ !isBionic ? 'Convert to Bionics' : 'Back to Normal' }}</p>
        <input type="checkbox" class="m-2 toggle toggle-success" v-model="isBionic" />
      </div>

      <input type="file" class="file-input file-input-bordered file-input-primary w-full mb-5"
        @change="handleFileChange" accept="image/*" />

      <div ref="generatedResult">
        <div class="capitalize text-xs opacity-50"><strong>Date: </strong> {{ readableDateTime(story.published) }}</div>
        <div class="capitalize"><strong>Phil-IRI ORAL STORY </strong></div>
        <div class="capitalize"> <strong>Test type: </strong> {{ story.testType }}</div>
        <div class="capitalize"> <strong>Grade Level: </strong> {{ story.gradeLevel }}</div>
        <div class="capitalize"> <strong>Prompt: </strong> {{ story.prompt }}</div>
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

        <strong>Literal Questions </strong>
        <TipTapEditor v-model="story.literalQuestions" :is-bionic="isBionic"></TipTapEditor>

        <strong>Interpretive Questions </strong>
        <TipTapEditor v-model="story.interpretiveQuestions" :is-bionic="isBionic"></TipTapEditor>

        <strong>Applied Questions </strong>
        <TipTapEditor v-model="story.appliedQuestions" :is-bionic="isBionic"></TipTapEditor>
      </div>


      <button class="btn btn-outline btn-primary my-2 w-full" type="button" @click="exportStory">
        <DownloadIcon class="w-5" />
        Save as Docx
      </button>

      <button class="btn btn-primary my-2 w-full" type="button" @click="saveStory">
        <SaveIcon class="w-5" />
        {{ !story.id ? 'Save Story' : 'Update Story' }}
      </button>

      <button type="button" class="btn btn-error btn-sm mt-10 btn-outline" @click="deleteStory()" v-if="story.id">
        Delete Story
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import TipTapEditor from '@/components/global/TipTapEditor.vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/ui/theme.store'
import { toast } from 'vue3-toastify';
import { SaveIcon, DownloadIcon } from 'lucide-vue-next';
import { defaultPoster, Level, TestType } from '@/services/types';
import { useOralStoryGeneratorStore } from '@/store/story/index'
import { exportFile, readableDateTime, countWords } from '@/lib';
import { onMounted, onUnmounted, computed } from 'vue';


const themeStore = useThemeStore()
const emit = defineEmits<{
  (e: 'update:isLoading', value: boolean): void;
}>()

const {
  backgroundOpacity,
  backgroundBlur,
} = storeToRefs(themeStore)

const oralStoryGenerator = useOralStoryGeneratorStore()
const generatedResult = ref<HTMLElement>()
const { story } = storeToRefs(oralStoryGenerator)
const isBionic = ref(false)
const numberOfWords = computed(() => countWords(story.value.story))

onMounted(() => {
  story.value.isPhilIri = true
})

onUnmounted(() => {
  story.value = oralStoryGenerator._normalState()
})

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
    story.value.poster = defaultPoster
  }
}


async function deleteStory(): Promise<void> {
  emit('update:isLoading', true)
  try {
    await oralStoryGenerator.deleteStory()
    toast.success("Successfully deleting the story")
  } catch (e) {
    toast.error("Something Wrong deleting the Story")
  } finally {
    emit('update:isLoading', false)
  }
}

</script>