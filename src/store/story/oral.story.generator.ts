import { defineStore } from 'pinia'
import { OpenAIClient } from '@/services';
import { IStory, Level, TestType, ReadingMode } from '@/services/types';
import { ref } from 'vue';

export const useOralStoryGeneratorStore = defineStore('silent-story-generator', () => {
  const openai = OpenAIClient.getInstance(import.meta.env.VITE_OPEN_AI_KEY)

  const story = ref<IStory>({
    gradeLevel: Level.GRADE_4,
    testType: TestType.POSTTEST,
    title: '',
    description: '',

    published: new Date(),
    content: '',
    story: '',
    questions: '',
    poster: '',
    readingMode: ReadingMode.ORAL_READING,
    prompt: ''
  })

  function content() {
    return `
Phil-IRI (The Philippine Informal Reading Inventory Assessment Tool)
${story.value.gradeLevel} - ${story.value.testType} - Silent Reading
GRADE LEVEL PASSAGE RATING SHEET
Title: ${story.value.title}
Description: ${story.value.description}`
  }


})