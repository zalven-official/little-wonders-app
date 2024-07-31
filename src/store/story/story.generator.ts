import { defineStore } from 'pinia'

import { Level, TestType, IOralStory } from '@/services/types';
import { ref } from 'vue';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { formatStringForFileName } from '@/lib';
import { OpenAIClient } from '@/services';

export const useStoryGeneratorStore = defineStore('story-generator', () => {
  const openai = OpenAIClient.getInstance(import.meta.env.VITE_OPEN_AI_KEY)
  const story = ref<IOralStory>({
    gradeLevel: Level.GRADE_4,
    testType: TestType.POSTTEST,
    title: '',
    description: '',

    published: new Date(),
    content: '',
    story: '',
    questions: '',
    poster: ''
  })

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
  async function generateOralStory(): Promise<IOralStory> {
    if (!story.value.title.trim() || !story.value.description.trim()) {
      throw Error("Title & Description are empty")
    }
    const prompt = storyGeneratorPrompt()
    const storyResult = await openai.apiCall([
      { "role": "system", "content": "You are a professional teacher working at the Department of Education (DepEd), skilled in fostering student growth, particularly in the areas of reading, critical thinking, and problem-solving." },
      { "role": "user", "content": prompt },
    ])
    if (storyResult)
      story.value = { ...story.value, story: storyResult, content: content(), questions: '', poster: '' }
    return story.value
  }


  async function generateOralQuestionnaire(): Promise<IOralStory> {
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
  async function generatePoster(): Promise<IOralStory> {
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
    console.log("helo")
  }


  async function exportStory(value: HTMLElement): Promise<void> {

    const canvas = await html2canvas(value);
    const imgData = canvas.toDataURL("image/PNG");

    const doc = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10;

    doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const pdfOutput = doc.output('arraybuffer');

    const fileName = `${formatStringForFileName(story.value.title)}.pdf`;
    await File.writeFile(File.externalRootDirectory + "/Download", fileName, pdfOutput, { replace: true });

    await FileOpener.open(File.externalRootDirectory + "/Download/" + fileName, "application/pdf");

  }

  return {
    generateOralStory,
    generateOralQuestionnaire,
    generatePoster,
    story,
    saveStory,
    exportStory
  }
})

