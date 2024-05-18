<template>
  <MainLayout>
    <div class="flex justify-center items-center flex-col">
      <div class="carousel carousel-center max-w-md p-4 space-x-4 rounded-box">
        <div class="relative carousel-item shadow-md rounded-box" v-for="(data, index) in themes" :key="index"
          :data-theme="data.value" @click="themeStore.changeTheme(data)">
          <img :src="data.image"
            :class="`h-48 w-72 object-cover rounded-box blur-${themeStore.sizeConverter(data.imageBlur).value} opacity-${themeStore.percentageConverter(data.imageOpacity)} ${data.value === theme.value ? 'p-2' : ''}`" />
          <div
            :class="`absolute m-2 text-xs bottom-0 right-0 bg-base-100 p-2 rounded font-thin bg-opacity-${backgroundOpacity}`">
            {{ data.label }}
          </div>
          <div
            :class="`absolute flex  bottom-0 left-0 m-2 bg-base-100 p-2 rounded shadow backdrop-blur-${themeStore.sizeConverter(data.backgroundBlur).value} bg-opacity-${themeStore.percentageConverter(data.backgrounOpacity)} `">
            <div class="w-2 h-5 bg-primary mx-1 rounded"></div>
            <div class="w-2 h-5 bg-secondary mx-1 rounded"></div>
            <div class="w-2 h-5 bg-accent mx-1 rounded"></div>
          </div>
        </div>
      </div>
      <div
        :class="`card w-4/5 bg-base-100 bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value} shadow-xl`">
        <div class="card-body">
          <!-- Background Opacity -->
          <p class="text-xs">Change Opacity {{ backgroundOpacity }}%</p>
          <input type="range" step="0.05" min="0" max="1" :value="theme.backgrounOpacity" class="range range-sm"
            @change="handleBackgroundOpactiyChange" />

          <div class="my-3" />

          <!-- Background Blur -->
          <p class="text-xs">Change Blur {{ backgroundBlur.label }}</p>
          <input type="range" step="1" min="0" max="6" :value="theme.backgroundBlur" class="range range-sm"
            @change="handleBackgroundBlurChange" />

          <div class="my-3" />

          <!-- Image Opacity -->
          <p class="text-xs">Background image Opacity {{ imageOpacity }}%</p>
          <input type="range" step="0.05" min="0" max="1" :value="theme.imageOpacity" class="range range-sm"
            @change="handleImageOpactiyChange" />

          <div class="my-3" />

          <!-- Image Blur -->
          <p class="text-xs">Background image Blur - {{ imageBlur.label }}</p>
          <input type="range" step="1" min="0" max="6" :value="theme.imageBlur" class="range range-sm"
            @change="handleImageBlurChange" />

          <div class="my-3" />


          <div class="card-actions justify-end">
            <button class="btn btn-sm btn-primary" @click="themeStore.setDefaultThemeSettings">
              <ListRestartIcon class="w-4 h-4 mr-1" />
              Reset
            </button>
          </div>

        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ListRestartIcon } from 'lucide-vue-next';
import MainLayout from '@/components/layouts/MainLayout.vue';
import { useThemeStore } from '@/store/ui/theme.store'
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore()
const { theme,
  themes,
  backgroundOpacity,
  backgroundBlur,
  imageBlur,
  imageOpacity
} = storeToRefs(themeStore)

function handleBackgroundOpactiyChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  theme.value.backgrounOpacity = parseFloat(inputElement.value)
}

function handleBackgroundBlurChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  theme.value.backgroundBlur = parseFloat(inputElement.value)
}

function handleImageOpactiyChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  theme.value.imageOpacity = parseFloat(inputElement.value)
}

function handleImageBlurChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  theme.value.imageBlur = parseFloat(inputElement.value)
}


</script>
