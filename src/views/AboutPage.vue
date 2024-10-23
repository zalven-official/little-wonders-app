<template>
  <MainLayout :is-loading="isLoading">



    <div :class="`w-full bg-base-100 mt-10 p-8 bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value}`">
      <h1 class="text-4xl font-bold text-primary text-center">AI-Generated Phil-IRI Stories Using LLM</h1>
      <p class="font-bold text-lg text-center w-full flex items-center justify-center">
        <SparklesIcon class="w-5 mr-2 " /> Generate Phil Iri Story
      </p>
      <p class="mt-5 text-xs text-center w-full">
        The Philippine Informal Reading Inventory (Phil-IRI) helps teachers assess students' reading skills. Our app
        supports this by generating personalized stories and questions for different reading levels, making learning fun
        and effective.
      </p>
      <p class="text-xs text-gray-600  text-center mt-2">
        Leveraging Large Language Models (LLMs) to generate and store customized Phil-IRI reading materials.
      </p>
      <p class="mt-5 text-xs text-center w-full opacity-60">
        BEED 3B - 2024 - 2025
      </p>
    </div>
    <div class="container mx-auto ">

      <!-- Grade Level Assessment Section -->
      <div class="mb-0">
        <div
          :class="`collapse collapse-arrow bg-base-100 rounded-none bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value}`">
          <input type="checkbox" />
          <div class="collapse-title text-md font-medium text-primary">
            Grade Level Assessment
          </div>
          <div class="collapse-content">
            <p class="mt-2 ">
              The assessment is tailored to different grade levels, ensuring the reading material is appropriate for the
              student's instructional level. It evaluates the student's ability to read texts that align with their
              grade-specific expectations.
            </p>
          </div>
        </div>
      </div>

      <!-- Oral Reading Section -->
      <div class="mb-0">
        <div
          :class="`collapse collapse-arrow bg-base-100 rounded-none bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value}`">
          <input type="checkbox" />
          <div class="collapse-title text-md font-medium text-primary">
            Oral Reading
          </div>
          <div class="collapse-content">
            <p class="mt-2 ">
              Involves the student reading a passage aloud. Assesses fluency, accuracy, pronunciation, and expression.
              Helps identify issues with phonemic awareness, decoding, and immediate comprehension.
            </p>
          </div>
        </div>
      </div>

      <!-- Silent Reading Section -->
      <div class="mb-0">
        <div
          :class="`collapse collapse-arrow bg-base-100 rounded-none bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value}`">
          <input type="checkbox" />
          <div class="collapse-title text-md font-medium text-primary">
            Silent Reading
          </div>
          <div class="collapse-content">
            <p class="mt-2 ">
              The student reads a passage silently, focusing on comprehension, retention, and the ability to infer
              meaning from the text. Teachers gauge understanding through follow-up questions and activities related to
              the text.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto">


      <!-- Section 1: AI-Driven Story Generation -->
      <div class="mb-0">
        <div
          :class="`collapse collapse-arrow bg-base-100 rounded-none bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value}`">
          <input type="checkbox" />
          <div class="collapse-title text-md font-medium text-primary">
            AI-Driven Story Generation
          </div>
          <div class="collapse-content">
            <p class="mt-2 ">
              The AI is designed to generate diverse and engaging stories based on the Phil-IRI framework. Teachers can
              input specific themes, titles, or descriptions, and the LLM creates reading passages suited for oral and
              silent reading assessments. These stories are customizable to meet the reading level of students, ensuring
              age-appropriate material.
            </p>
          </div>
        </div>
      </div>

      <!-- Section 2: Adaptability Across Grade Levels -->
      <div class="mb-0">
        <div
          :class="`collapse collapse-arrow bg-base-100 rounded-none bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value}`">
          <input type="checkbox" />
          <div class="collapse-title text-md font-medium text-primary">
            Adaptability Across Grade Levels
          </div>
          <div class="collapse-content">
            <p class="mt-2 ">
              The LLM tailors vocabulary, sentence structure, and themes to match the reading skills of different grade
              levels. It supports the Phil-IRI's objectives by generating stories that align with students' fluency and
              comprehension capabilities.
            </p>
          </div>
        </div>
      </div>

      <!-- Section 3: Instant Story Customization -->
      <div class="mb-0">
        <div
          :class="`collapse collapse-arrow bg-base-100 rounded-none bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value}`">
          <input type="checkbox" />
          <div class="collapse-title text-md font-medium text-primary">
            Instant Story Customization
          </div>
          <div class="collapse-content">
            <p class="mt-2 ">
              Teachers can generate stories on demand by inputting topics or keywords. The AI will instantly create
              reading passages that are suitable for the Phil-IRI Pre Test and Post Test, reducing the manual effort
              typically involved in creating assessment materials.
            </p>
          </div>
        </div>
      </div>

      <!-- Section 4: Efficient Story Storage -->
      <div class="mb-0">
        <div
          :class="`collapse collapse-arrow bg-base-100 rounded-none bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value}`">
          <input type="checkbox" />
          <div class="collapse-title text-md font-medium text-primary">
            Efficient Story Storage
          </div>
          <div class="collapse-content">
            <p class="mt-2 ">
              Once generated, the stories are stored securely in a Phil-IRI Story Repository. Teachers can organize,
              retrieve, and reuse reading materials as needed, providing a comprehensive resource for future reading
              assessments.
            </p>
          </div>
        </div>
      </div>

      <!-- Section 5: Seamless Integration -->
      <div class="mb-0">
        <div
          :class="`collapse collapse-arrow bg-base-100 rounded-none bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value}`">
          <input type="checkbox" />
          <div class="collapse-title text-md font-medium text-primary">
            Seamless Integration
          </div>
          <div class="collapse-content">
            <p class="mt-2 ">
              The generated stories integrate seamlessly into lesson plans and assessments, streamlining the process of
              preparing customized reading materials for students. This automation allows educators to focus more on
              instruction.
            </p>
          </div>
        </div>
      </div>

      <!-- Benefits Section -->
      <div :class="` w-full bg-base-100 p-8 bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value}`">
        <h2 class="text-3xl font-semibold text-primary">Benefits for Educators</h2>
        <ul class="list-disc list-inside mt-4 ">
          <li class="mb-2">Time-Saving: Automates the story creation process, allowing teachers to focus on instruction.
          </li>
          <li class="mb-2">Consistency with Educational Standards: The stories are aligned with Phil-IRI, ensuring
            compliance with educational requirements.</li>
          <li class="mb-2">Dynamic Story Repository: Easily organize and access both AI-generated and traditional
            Phil-IRI stories for reuse in the future.</li>
        </ul>
      </div>
    </div>



  </MainLayout>
</template>



<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue';
import { SparklesIcon } from 'lucide-vue-next'
import { useThemeStore } from '@/store/ui/theme.store'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

interface Profiles {
  name: string
  email: string
  image: string
}
const isLoading = ref(false)
const profiles = ref<Profiles[]>([
  {
    name: "Alyssa Pineda",
    email: "alyssapineda@gmail.com",
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  }
])
const themeStore = useThemeStore()
const {
  backgroundOpacity,
  backgroundBlur,
} = storeToRefs(themeStore)

</script>