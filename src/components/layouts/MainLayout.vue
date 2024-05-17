<script setup lang="ts">
import { IonContent } from '@ionic/vue';
import NavigationBar from '@/components/global/NavigationBar.vue'

</script>

<template>
  <ion-content :fullscreen="true">
    <main class="min-h-full overflow-auto" data-theme="dark">
      <NavigationBar>
        <slot></slot>
      </NavigationBar>
    </main>
  </ion-content>
</template>