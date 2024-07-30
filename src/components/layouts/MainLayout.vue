<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import NavigationBar from '@/components/global/NavigationBar.vue'
import { useThemeStore } from '@/store/ui/theme.store'

const themeStore = useThemeStore()

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
});

</script>

<template>
  <IonPage> <ion-content :fullscreen="true">
      <main class="min-h-full overflow-y-auto overflow-x-hidden" :data-theme="themeStore.theme.value">
        <img :src="themeStore.theme.background"
          :class="`fixed top-0 h-full object-cover object-center blur-${themeStore.imageBlur.value} opacity-${themeStore.imageOpacity}`" />
        <NavigationBar>
          <slot></slot>
          <div v-if="isLoading"
            class="fixed z-50 top-0 left-0 w-full bg-base-300 bg-opacity-50 h-full flex justify-center items-center">
            <span class="loading text-primary loading-infinity loading-lg"></span>
          </div>
        </NavigationBar>
      </main>
    </ion-content>
  </IonPage>
</template>
