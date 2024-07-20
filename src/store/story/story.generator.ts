import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum Level {
  GRADE_4 = 'grade 4',
  GRADE_5 = 'grade 5',
  GRADE_6 = 'grade 6',
}

export enum TestType {
  PRETEST = "Pre Test",
  POSTTEST = "Post Test",
  STORY = "Story"
}

export enum ReadingMode {
  ORAL = "Oral Reading",
  SILENT = "Silent Reading"
}

interface Question {
  description: string
  options: string[]
  answer: string,
}


export interface Story {
  title: string
  subtitle: string
  story: string
  poster: string

  questions: Question[]
  numberOfQuestions: number
  showAnswer: boolean

  testType: TestType
  readingMode: ReadingMode
  level: Level
  published: Date
}

export const useStoryGeneratorStore = defineStore('story-generator', () => {
  const story = ref<Story>({
    title: '',
    subtitle: '',
    showAnswer: false,
    story: `"Mary Lennox is a spoiled and sickly girl who is sent to live with her uncle in England after her parents die. At her uncle's estate, Mary discovers a hidden garden that has been locked up for years. With the help of her new friend Dickon, Mary works to bring the garden back to life`,
    poster: "https://static.vecteezy.com/system/resources/previews/003/349/134/non_2x/cute-workout-cat-cartoon-free-vector.jpg",
    questions: [
      {
        "description": "What is the name of the river where Tom Sawyer lives?",
        "answer": "Mississippi River",
        options: ["a.) Sample option 1", "b.) Sample option 2", "c.) Sample option 3", "d.) Sample option 4"]
      },
      {
        "description": "Who is Tom's adventurous friend?",
        "answer": "Huck Finn",
        options: ["a.) Sample option 1", "b.) Sample option 2", "c.) Sample option 3", "d.) Sample option 4"]
      },
      {
        "description": "What do Tom and Huck decide to explore?",
        "answer": "Spooky old house",
        options: ["a.) Sample option 1", "b.) Sample option 2", "c.) Sample option 3", "d.) Sample option 4"]
      },
      {
        "description": "What do Tom and Huck decide to explore?",
        "answer": "Spooky old house",
        options: ["a.) Sample option 1", "b.) Sample option 2", "c.) Sample option 3", "d.) Sample option 4"]
      },
      {
        "description": "What do Tom and Huck decide to explore?",
        "answer": "Spooky old house",
        options: ["a.) Sample option 1", "b.) Sample option 2", "c.) Sample option 3", "d.) Sample option 4"]
      },
      {
        "description": "What do Tom and Huck decide to explore?",
        "answer": "Spooky old house",
        options: ["a.) Sample option 1", "b.) Sample option 2", "c.) Sample option 3", "d.) Sample option 4"]
      }
    ],
    numberOfQuestions: 0,
    testType: TestType.PRETEST,
    readingMode: ReadingMode.ORAL,
    level: Level.GRADE_4,
    published: new Date()
  })

  function deleteQuestion(question: Question) {
    console.log(question)
  }
  function generateQuestion(size: number) {
    console.log(size)

  }
  function generateStory() {
    console.log(story.value.title)
  }

  return {
    story,
    generateStory,
    generateQuestion,
    deleteQuestion
  }
})