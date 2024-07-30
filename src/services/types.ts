
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

export interface IOralStory {
  gradeLevel: Level
  testType: TestType
  description: string
  title: string
  published: Date

  content: string
  readingMaterial: string
  questions: string
  poster: string
}
