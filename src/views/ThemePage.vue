<template>
  <MainLayout>
    <div class="flex flex-wrap items-center justify-center mt-10">
      <div v-for="(data, index) in themeStore.themes" :key="index" class="relative w-72 h-32 rounded-lg m-5"
        :data-theme="data.value" @click="themeStore.changeTheme(data)">
        <img :src="data.image" alt="theme-image" class="absolute w-full h-full rounded-lg" />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 from-1% rounded" />
        <div class="absolute flex  bottom-0 left-0 m-2 bg-base-100 p-2 rounded bg-opacity-80 shadow">
          <div class="w-2 h-5 bg-primary mx-1 rounded"></div>
          <div class="w-2 h-5 bg-secondary mx-1 rounded"></div>
          <div class="w-2 h-5 bg-accent mx-1 rounded"></div>
        </div>

        <div class="absolute m-2 text-xs bottom-0 right-0 bg-base-100 p-2 rounded font-thin">
          {{ data.label }}
        </div>

      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/components/layouts/MainLayout.vue';
import { useThemeStore } from '@/store/ui/theme.store'

const themeStore = useThemeStore()

</script>
