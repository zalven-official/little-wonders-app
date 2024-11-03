<template>
  <ion-app v-if="!showIntroVideo">
    <ion-router-outlet />
    <!-- Your main app content goes here -->
  </ion-app>

  <!-- Intro Video (plays before app content) -->
  <div v-if="showIntroVideo" class="video-container">
    <video ref="video" autoplay muted playsinline @ended="onVideoEnded">
      <source :src="introVideo" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import introVideo from '@/assets/Little Wonder.mp4';
import { ref, onMounted } from 'vue';

const showIntroVideo = ref(true);

onMounted(() => {
  setTimeout(() => {
    showIntroVideo.value = false;
  }, 8000);
});

function onVideoEnded() {
  showIntroVideo.value = false;
}
</script>

<style scoped>
.video-container {
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

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
