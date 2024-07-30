import { IOralStory, Level, TestType } from "./types";

async function getCompletion(value: string): Promise<string> {
  return value
}
async function getPoster(value: string): Promise<string> {
  return value
}

export default class OralStory {
  gradeLevel: Level;
  testType: TestType;
  title: string;
  description: string;

  constructor(
    gradeLevel: Level,
    testType: TestType,
    title: string,
    description: string
  ) {
    this.gradeLevel = gradeLevel;
    this.testType = testType;
    this.title = title;
    this.description = description;
  }

  private generateReadingMaterialContent(): string {
    return `
      Phil-IRI (The Philippine Informal Reading Inventory Assessment Tool)
      ${this.gradeLevel} - ${this.testType} - Silent Reading
      GRADE LEVEL PASSAGE RATING SHEET
      Title: ${this.title}
      Description: ${this.description}
    `;
  }

  private async generateReadingMaterial(): Promise<string> {
    const contentPromptFormat = `
      ${this.generateReadingMaterialContent()}
      Create a reading material content based on the content above. Make sure the format is just like Phil-IRI reading materials that is appropriate for ${this.gradeLevel} and for ${this.testType}, short and manageable reading materials.
      Phil-IRI reading materials are structured to assess the reading abilities and comprehension skills of students in the Philippines.
      Keep in mind that this only returns the content, not the description, title, or any placeholders. If there is a placeholder, just put any random input for it.
    `;
    return await getCompletion(contentPromptFormat);
  }

  private async generatePosterImage(): Promise<string> {
    const posterPromptFormat = `
      Based on these content create me a cartoonish or animated image based on the this "${this.title}" and ${this.description}.
    `;
    return await getPoster(posterPromptFormat);
  }

  private async generateQuestionnaire(): Promise<string> {
    const content = this.generateReadingMaterialContent();
    const generatedReadingMaterial = this.generateReadingMaterial();
    const questionnairePromptFormat = `
      ${content}\n${generatedReadingMaterial}
      Create a questionnaire based on the content above. Make sure the format is just like Phil-IRI questionnaires that is appropriate for ${this.gradeLevel} and for ${this.testType}, multiple choices.
      Keep in mind that this only returns the content, not the description, title, or any placeholders. If there is a placeholder, just put any random input for it.
    `;
    return await getCompletion(questionnairePromptFormat);
  }

  async runPreTestSilent(): Promise<IOralStory> {
    const content = this.generateReadingMaterialContent();
    const generatedReadingMaterial = await this.generateReadingMaterial();
    const questions = await this.generateQuestionnaire();
    const poster = await this.generatePosterImage();

    return {
      gradeLevel: this.gradeLevel,
      testType: this.testType,
      description: this.description,
      title: this.title,
      published: new Date(),
      content: content,
      readingMaterial: generatedReadingMaterial,
      questions: questions,
      poster: poster
    };
  }


}