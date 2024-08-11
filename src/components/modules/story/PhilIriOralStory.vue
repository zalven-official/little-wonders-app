<template>
  <div>
    <form
      :class="` card w-full bg-base-100 bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value} shadow-xl my-2 p-5 overflow-y-auto`">

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
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/ui/theme.store'
import { toast } from 'vue3-toastify';
import { SaveIcon, DownloadIcon } from 'lucide-vue-next';
import { useOralStoryGeneratorStore } from '@/store/story/index'
import { exportFile } from '@/lib';
import { onMounted } from 'vue';

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

onMounted(() => {
  story.value.isPhilIri = true
})


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