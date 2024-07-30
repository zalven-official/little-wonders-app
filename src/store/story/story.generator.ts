import { defineStore } from 'pinia'

import OralStory from '@/services/oral_story.service'
import { Level, TestType, IOralStory } from '@/services/types';
import { ref } from 'vue';

export const useStoryGeneratorStore = defineStore('story-generator', () => {

  const story = ref({
    level: Level.GRADE_4,
    testType: TestType.POSTTEST,
    title: '',
    description: '',
  })

  async function generateOralStory(): Promise<IOralStory> {
    const oralStory = new OralStory(story.value.level, story.value.testType, story.value.title, story.value.description);
    return await oralStory.runPreTestSilent()
  }

  async function saveStory(value: string): Promise<void> {
    console.log(value)
  }

  async function exportStory(value: string): Promise<void> {
    console.log(value)
  }

  return { generateOralStory, story, saveStory, exportStory }
})
