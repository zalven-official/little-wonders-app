<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import NavigationBar from '@/components/global/NavigationBar.vue'
import { useThemeStore } from '@/store/ui/theme.store'

const themeStore = useThemeStore()

</script>

<template>
  <IonPage> <ion-content :fullscreen="true">
      <main class="min-h-full overflow-y-auto overflow-x-hidden" :data-theme="themeStore.theme.value">
        <img :src="themeStore.theme.background"
          :class="`fixed top-0 h-full object-cover object-center blur-${themeStore.imageBlur.value} opacity-${themeStore.imageOpacity}`" />
        <NavigationBar>
          <slot></slot>
        </NavigationBar>
      </main>
    </ion-content>
  </IonPage>
</template>
