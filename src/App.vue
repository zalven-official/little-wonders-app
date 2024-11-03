<template>
  <ion-app v-if="!showIntroComponent">
    <ion-router-outlet />
    <!-- Your main app content goes here -->
  </ion-app>

  <!-- Intro Component (displays before app content) -->
  <div v-if="showIntroComponent" class="intro-container">
    <IntroLoading @endIntro="onIntroEnded" />
  </div>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import IntroLoading from '@/components/global/IntroLoading.vue';

const showIntroComponent = ref(true);

onMounted(() => {
  setTimeout(() => {
    showIntroComponent.value = false;
  }, 8000);
});

function onIntroEnded() {
  showIntroComponent.value = false;
}
</script>

<style scoped>
.intro-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  z-index: 9999;
}
</style>
