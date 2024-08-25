import { defineStore } from 'pinia'

import { Level, TestType, IStory, ReadingMode, defaultPoster } from '@/services/types';
import { ref } from 'vue';

import { OpenAIClient } from '@/services';
import { createStory, updateStory, destroyStory } from '@/services/story.service';
import { useIonRouter } from '@ionic/vue';

export const useSilentStoryGeneratorStore = defineStore('silent-story-generator', () => {
  const openai = OpenAIClient.getInstance(import.meta.env.VITE_OPEN_AI_KEY)
  const story = ref<IStory>(_normalState())
  const ionRouter = useIonRouter();

  function _normalState(): IStory {
    return {
      gradeLevel: Level.GRADE_4,
      testType: TestType.POSTTEST,
      title: '',
      description: '',
      isPhilIri: false,

      published: new Date(),
      content: '',
      story: '',
      questions: '',
      poster: defaultPoster,
      readingMode: ReadingMode.SILENT_READING
    }
  }

  function content() {
    return `
Phil-IRI (The Philippine Informal Reading Inventory Assessment Tool)
${story.value.gradeLevel} - ${story.value.testType} - Silent Reading
GRADE LEVEL PASSAGE RATING SHEET
Title: ${story.value.title}
Description: ${story.value.description}`
  }

  function storyGeneratorPrompt() {
    return `
${content()}
Create a reading material content based on the content above. Make sure the format is just like Phil-IRI reading materials that is appropriate for ${story.value.gradeLevel} and for ${story.value.testType}, short and manageable reading materials.
Phil-IRI reading materials are structured to assess the reading abilities and comprehension skills of students in the Philippines.
Keep in mind that this only returns the content, not the description, title, or any placeholders. If there is a placeholder, just put any random input for it.`
  }

  function questionnaireGeneratorPrompt() {
    return `
${content()}\n${story.value.story}\n
Create a questionnaire based on the content above. Make sure the format is just like Phil-IRI questionnaires that is appropriate for ${story.value.gradeLevel} and for ${story.value.testType}, multiple choices.
Keep in mind that this only returns the content, not the description, title, or any placeholders. If there is a placeholder, just put any random input for it.`;
  }

  function posterGeneratorPrompt() {
    return `Based on these content create me a cartoonish or animated image based on the this "${story.value.title}" and ${story.value.description}.`
  }
  async function generateSilentStory(): Promise<IStory> {
    if (!story.value.title.trim() || !story.value.description.trim()) {
      throw Error("Title & Description are empty")
    }
    const prompt = storyGeneratorPrompt()
    const storyResult = await openai.apiCall([
      { "role": "system", "content": "You are a professional teacher working at the Department of Education (DepEd), skilled in fostering student growth, particularly in the areas of reading, critical thinking, and problem-solving." },
      { "role": "user", "content": prompt },
    ])
    if (storyResult)
      story.value = { ...story.value, story: storyResult, content: content(), questions: '' }
    return story.value
  }


  async function generateSilentQuestionnaire(): Promise<IStory> {
    if (!story.value.title.trim() || !story.value.description.trim()) {
      throw Error("Title & Description are empty")
    }
    if (!story.value.story.trim()) {
      throw Error("The story are empty")
    }
    const prompt = questionnaireGeneratorPrompt()

    const questionnareResult = await openai.apiCall([
      { "role": "system", "content": "You are a professional teacher working at the Department of Education (DepEd), skilled in fostering student growth, particularly in the areas of reading, critical thinking, and problem-solving." },
      { "role": "user", "content": prompt },
    ])

    if (questionnareResult)
      story.value = { ...story.value, questions: questionnareResult }
    return story.value
  }
  async function generatePoster(): Promise<IStory> {
    const prompt = posterGeneratorPrompt()
    const image = await openai.generateImage(prompt)
    const generatedPoster = `data:image/png;base64,${image[0].b64_json}`
    if (generatedPoster) {
      story.value = { ...story.value, poster: generatedPoster }
    }
    return story.value
  }

  async function saveStory(): Promise<void> {
    if (!story.value.id) {
      const data = await createStory(story.value)
      if (data?.id) {
        ionRouter.navigate(`/story-generated/${data?.id}`, 'forward', 'replace');
      }
    } else {
      await updateStory(story.value.id, story.value)
    }
  }

  async function deleteStory(): Promise<void> {
    if (story.value?.id) {
      await destroyStory(story.value.id)
      ionRouter.navigate('/', 'forward', 'replace');
    }
  }

  return {
    story,
    _normalState,
    generateSilentStory,
    generateSilentQuestionnaire,
    generatePoster,
    saveStory,
    deleteStory
  }
})

