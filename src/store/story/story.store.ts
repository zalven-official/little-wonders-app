import { defineStore } from 'pinia'
import SampleStories from '@/data/sample.stories.json'
import { ref } from 'vue'
import { Level, TestType, IStory, ReadingMode } from '@/services/types';


export const useStoryStore = defineStore('story', () => {

  const stories = ref(
    {
      stories: SampleStories as unknown as IStory[],
      filters: {
        gradeLevel: 'Grade' as Level | 'Grade',
        testType: 'Type' as TestType | 'Type',
        readingMode: 'Mode' as ReadingMode | 'Mode',
        date: 'Date' as 'Newest' | 'Oldest' | 'Date',
        search: '',
      },
    }
  )

  const filteredStories = ref<IStory[]>([]);
  function search() {
    let filtered = stories.value.stories;

    // Filter by level
    if (!stories.value.filters.gradeLevel.includes('Grade') && stories.value.filters.gradeLevel) {
      filtered = filtered.filter(story => story.gradeLevel.trim().toLowerCase() === stories.value.filters.gradeLevel.trim().toLowerCase());
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