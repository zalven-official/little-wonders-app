import { defineStore } from 'pinia'

import OralStory from '@/services/oral_story.service'
import { Level, TestType, IOralStory } from '@/services/types';
import { ref } from 'vue';


import { asBlob } from 'html-docx-js-typescript'
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";




export const useStoryGeneratorStore = defineStore('story-generator', () => {

  const story = ref({
    level: Level.GRADE_4,
    testType: TestType.POSTTEST,
    title: '',
    description: '',
  })

  async function generateOralStory(): Promise<IOralStory> {
    const oralStory = new OralStory(story.value.level, story.value.testType, story.value.title, story.value.description);
    return await oralStory.runPreTestSilent()
  }

  async function saveStory(): Promise<void> {

    console.log("helo")
  }

  async function exportStory(value: HTMLElement): Promise<void> {

    try {
      const data = await asBlob(value.outerHTML);
      const fileName = 'exported_story.docx';
      const filePath = File.externalRootDirectory + "/Download";
      await File.writeFile(filePath, fileName, data, { replace: true });
      await FileOpener.open(filePath + "/" + fileName, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

    } catch (error) {
      console.error('Error exporting story:', error);
    }

  }

  return { generateOralStory, story, saveStory, exportStory }
})

