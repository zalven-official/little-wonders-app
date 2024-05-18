import { OpenAIClient } from '@/services'
import { defineStore } from 'pinia'


export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export interface StoryCreator {
  name: string
  age: number,
  gender: Gender
  description: string,
  characters: string[]
}

export interface Story {
  title: string
  subtitle: string
  creator: StoryCreator,
  poster?: string,
  story: string
  published: Date
  isUnicode?: boolean
}


export const useStoryStore = defineStore('story', () => {
  import.meta.env.VITE_OPEN_AI_KEY
  const openai = OpenAIClient.getInstance(import.meta.env.VITE_OPEN_AI_KEY)

  async function generateHots(story: string) {
    const result = await openai.apiCall([
      { "role": "system", "content": "You are a professional teacher working at the Department of Education (DepEd), skilled in fostering student growth, particularly in the areas of reading, critical thinking, and problem-solving." },
      { "role": "user", "content": `${story}. Can you generate higher-order thinking skills (HOTS) questions based on the story? this is only for primary students that barely know english language.` },
    ], 'gpt-3.5-turbo', 0.5, 4096)
    return result
  }
  return {
    generateHots
  }
})