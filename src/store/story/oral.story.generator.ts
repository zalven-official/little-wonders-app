import { defineStore } from 'pinia'
import { OpenAIClient } from '@/services';
import { IStory, Level, TestType, ReadingMode } from '@/services/types';
import { ref } from 'vue';
import { createStory } from '@/services/story.service';

export const useOralStoryGeneratorStore = defineStore('oral-story-generator', () => {
  const openai = OpenAIClient.getInstance(import.meta.env.VITE_OPEN_AI_KEY)

  const story = ref<IStory>({
    gradeLevel: Level.GRADE_4,
    testType: TestType.POSTTEST,
    title: '',
    description: '',
    isPhilIri: false,

    published: new Date(),
    content: '',
    story: '',
    questions: '',
    poster: '',
    readingMode: ReadingMode.ORAL_READING,
    prompt: '',
    literalQuestions: '',
    interpretiveQuestions: '',
    appliedQuestions: '',
  })

  function content() {
    return `
Phil-IRI (The Philippine Informal Reading Inventory Assessment Tool)
${story.value.gradeLevel} ${story.value.testType} - Oral Reading
GRADE LEVEL PASSAGE RATING SHEET
Title: ${story.value.title}
Description: ${story.value.description}
Prompt: ${story.value.prompt}`
  }

  function storyGeneratorPrompt() {
    return `
${content()}
Create a reading material based on the content above and prompt. Make sure the format is just like Phil-IRI, short and manageable reading material.
Phil-IRI stories are structured to assess the reading abilities and comprehension skills of students in the Philippines.
Keep in mind that this only returns the content, not the description, title, or any placeholders. If there is a placeholder, just put any random input for it.
That means names, date, subject, or place should be named depending on your choice.`
  }

  function questionnare(question_type: string, question_description: string) {
    return `${content()}\n
content: ${story.value.story}

Create a questionnaire based on the content above, following the format of Phil-IRI questionnaires that is appropriate for ${story.value.gradeLevel} and ${story.value.testType}.
the questionnaire should be ${question_type} which ${question_description}. Total Questions should be atleast 5 depending on the story.
Please provide an answer, or a different possible answer but connected to the content, or both for each question. Make each question simple to answer.`
  }

  async function generateOralStory(): Promise<IStory> {
    if (!story.value.title.trim() || !story.value.description.trim() || !story.value.prompt) {
      throw Error("Title,Description or Prompt are empty")
    }
    const prompt = storyGeneratorPrompt()
    const storyResult = await openai.apiCall([
      { "role": "system", "content": "You are a professional teacher working at the Department of Education (DepEd), skilled in fostering student growth, particularly in the areas of reading, critical thinking, and problem-solving." },
      { "role": "user", "content": prompt },
    ])
    if (storyResult)
      story.value = {
        ...story.value, story: storyResult, content: content(),
        questions: '',
        poster: '',
        literalQuestions: '',
        interpretiveQuestions: '',
        appliedQuestions: '',
      }
    return story.value
  }


  function posterGeneratorPrompt() {
    return `Based on thse content create me a cartoonish or animated image based on the this "${story.value.title}" and ${story.value.description}.`
  }

  async function generateLiteralQuestions(): Promise<IStory> {
    if (!story.value.title.trim() || !story.value.description.trim() || !story.value.prompt) {
      throw Error("Title,Description or Prompt are empty")
    }
    if (!story.value.story.trim()) {
      throw Error("The story are empty")
    }
    const prompt = questionnare("Literal", "focus on basic facts and details")
    const questionnareResult = await openai.apiCall([
      { "role": "system", "content": "You are a professional teacher working at the Department of Education (DepEd), skilled in fostering student growth, particularly in the areas of reading, critical thinking, and problem-solving." },
      { "role": "user", "content": prompt },
    ])
    if (questionnareResult)
      story.value = { ...story.value, literalQuestions: questionnareResult }
    return story.value
  }


  async function generateInterpretiveQuestions(): Promise<IStory> {
    if (!story.value.title.trim() || !story.value.description.trim() || !story.value.prompt) {
      throw Error("Title,Description or Prompt are empty")
    }
    if (!story.value.story.trim()) {
      throw Error("The story are empty")
    }
    const prompt = questionnare("Interpretive", "means questions delve deeper into the meaning and implications of the text.")
    const questionnareResult = await openai.apiCall([
      { "role": "system", "content": "You are a professional teacher working at the Department of Education (DepEd), skilled in fostering student growth, particularly in the areas of reading, critical thinking, and problem-solving." },
      { "role": "user", "content": prompt },
    ])
    if (questionnareResult)
      story.value = { ...story.value, interpretiveQuestions: questionnareResult }
    return story.value
  }



  async function generateAppliedQuestions(): Promise<IStory> {
    if (!story.value.title.trim() || !story.value.description.trim() || !story.value.prompt) {
      throw Error("Title,Description or Prompt are empty")
    }
    if (!story.value.story.trim()) {
      throw Error("The story are empty")
    }
    const prompt = questionnare("Applied", " means it require students to apply what they've read to new situations or context.")
    const questionnareResult = await openai.apiCall([
      { "role": "system", "content": "You are a professional teacher working at the Department of Education (DepEd), skilled in fostering student growth, particularly in the areas of reading, critical thinking, and problem-solving." },
      { "role": "user", "content": prompt },
    ])
    if (questionnareResult)
      story.value = { ...story.value, appliedQuestions: questionnareResult }
    return story.value
  }

  async function generatePoster(): Promise<IStory> {
    const prompt = posterGeneratorPrompt()
    const image = await openai.generateImage(prompt)
    const generatedPoster = `data:image/png;base64,${image[0].b64_json}`
    console.log(image)

    if (generatedPoster) {
      story.value = { ...story.value, poster: generatedPoster }
    }
    return story.value
  }

  async function saveStory(): Promise<void> {
    createStory(story.value)
  }

  return {
    story,
    generateOralStory,
    generateLiteralQuestions,
    generateInterpretiveQuestions,
    generateAppliedQuestions,
    generatePoster,
    saveStory
  }

})