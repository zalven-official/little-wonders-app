// import { OpenAIClient } from '@/services'
import { defineStore } from 'pinia'
import SampleStories from '@/data/sample.stories.json'
import { ref } from 'vue'
import type { Story, Level, TestType, ReadingMode } from './story.generator'

export const useStoryStore = defineStore('story', () => {
  // import.meta.env.VITE_OPEN_AI_KEY
  // const openai = OpenAIClient.getInstance(import.meta.env.VITE_OPEN_AI_KEY)

  // async function generateHots(story: string) {
  //   const result = await openai.apiCall([
  //     { "role": "system", "content": "You are a professional teacher working at the Department of Education (DepEd), skilled in fostering student growth, particularly in the areas of reading, critical thinking, and problem-solving." },
  //     { "role": "user", "content": `${story}. Can you generate higher-order thinking skills (HOTS) questions based on the story? this is only for primary students that barely know english language.` },
  //   ], 'gpt-3.5-turbo', 0.5, 4096)
  //   return result
  // }
  // return {
  //   generateHots
  // }\

  const stories = ref(
    {
      stories: SampleStories as unknown as Story[],
      filters: {
        level: 'Grade' as Level | 'Grade',
        testType: 'Type' as TestType | 'Type',
        readingMode: 'Mode' as ReadingMode | 'Mode',
        date: 'Date' as 'Newest' | 'Oldest' | 'Date',
        search: '',
      },
    }
  )

  const filteredStories = ref<Story[]>([]);
  function search() {
    let filtered = stories.value.stories;

    // Filter by level
    if (!stories.value.filters.level.includes('Grade') && stories.value.filters.level) {
      filtered = filtered.filter(story => story.level.trim().toLowerCase() === stories.value.filters.level.trim().toLowerCase());
    }

    // Filter by test type
    if (!stories.value.filters.testType.includes('Type') && stories.value.filters.testType) {
      filtered = filtered.filter(story => story.testType.trim().toLowerCase() === stories.value.filters.testType.trim().toLowerCase());
    }

    // Filter by reading mode
    if (!stories.value.filters.readingMode.includes('Mode') && stories.value.filters.readingMode) {
      filtered = filtered.filter(story => story.readingMode.trim().toLowerCase() === stories.value.filters.readingMode.trim().toLowerCase());
    }

    // Sort by date
    if (stories.value.filters.date && stories.value.filters.date === 'Newest') {
      filtered.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
    } else if (stories.value.filters.date && stories.value.filters.date === 'Oldest') {
      filtered.sort((a, b) => new Date(a.published).getTime() - new Date(b.published).getTime());
    }

    if (stories.value.filters.search.trim() !== '') {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(stories.value.filters.search.trim().toLowerCase())
      );
    }

    filteredStories.value = filtered;
  }
  return {
    filteredStories,
    stories,
    search
  }
})