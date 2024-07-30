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

    const data = await asBlob(value.innerHTML, { orientation: 'portrait', margins: { top: 100 } })

    const fileName = 'exported_story.docx';

    File.writeFile(File.externalRootDirectory + "/Download", fileName,
      new Blob([data]), { replace: true }
    );
    FileOpener.open(
      File.externalRootDirectory + "/Download/" + fileName,
      "application/pdf"
    );


  }

  return { generateOralStory, story, saveStory, exportStory }
})

