import { defineStore } from 'pinia';
import SampleStories from '@/data/sample.stories.json';
import { ref } from 'vue';
import { IStory } from '@/services/types';
import { fetchStories, type FetchStoriesParams } from '@/services/story.service';

export const useStoryStore = defineStore('story', () => {
  const stories = ref({
    stories: SampleStories as IStory[],
    filters: _normalState(),
  });
  function _normalState(): FetchStoriesParams {
    return {
      gradeLevel: undefined,
      testType: undefined,
      readingMode: undefined,
      sort: undefined,
      title: undefined,
      isPhilIri: undefined,
    }
  }
  async function search() {
    try {
      const response = await fetchStories(stories.value.filters);
      if (response) {
        stories.value.stories = response;
      }
    } catch (error) {
      console.error('Failed to fetch stories', error);
    }
  }


  return {
    stories,
    search,
    _normalState
  };
});
