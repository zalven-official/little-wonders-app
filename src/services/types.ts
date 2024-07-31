
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
  ORAL_READING = 'Oral reading',
  SILENT_READING = 'Silent reading'
}

interface IBaseOralStory {
  gradeLevel: Level;
  testType: TestType;
  description: string;
  title: string;
  published: Date;
  readingMode: ReadingMode;

  content: string;
  story: string;
  questions: string;
  poster: string;
}

interface IOralStoryOral extends IBaseOralStory {
  readingMode: ReadingMode.ORAL_READING;
  prompt: string;
  literalQuestions: string
  interpretiveQuestions: string
  appliedQuestions: string
}

interface ISilentStory extends IBaseOralStory {
  readingMode: ReadingMode.SILENT_READING;
  prompt?: never;
  literalQuestions?: never
  interpretiveQuestions?: never
  appliedQuestions?: never
}

export type IStory = IOralStoryOral | ISilentStory;