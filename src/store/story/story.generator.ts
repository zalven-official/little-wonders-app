import { defineStore } from 'pinia'

import OralStory from '@/services/oral_story.service'
import { Level, TestType, IOralStory } from '@/services/types';
import { ref } from 'vue';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { formatStringForFileName } from '@/lib';

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

    // Convert HTML to Canvas
    // Convert HTML to Canvas
    const canvas = await html2canvas(value);
    const imgData = canvas.toDataURL("image/PNG");

    const doc = new jsPDF("p", "mm", "a4");
    const imgWidth = 190; // Width of the A4 page minus the margin
    const pageHeight = 295; // Height of A4 page
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height to maintain aspect ratio
    let heightLeft = imgHeight;
    let position = 10; // Margin from top

    doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // If the content is taller than one page, add another page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const pdfOutput = doc.output('arraybuffer'); // Generate PDF as array buffer

    const fileName = `${formatStringForFileName(story.value.title)}.pdf`;
    await File.writeFile(File.externalRootDirectory + "/Download", fileName, pdfOutput, { replace: true });

    await FileOpener.open(File.externalRootDirectory + "/Download/" + fileName, "application/pdf");
    console.log("PDF file generated and opened successfully.");
  }

  return { generateOralStory, story, saveStory, exportStory }
})

