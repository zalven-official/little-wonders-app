<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import NavigationBar from '@/components/global/NavigationBar.vue'
import { useThemeStore } from '@/store/ui/theme.store'

const themeStore = useThemeStore()

</script>

<template>
  <IonPage> <ion-content :fullscreen="true">
      <main class="min-h-full overflow-auto" :data-theme="themeStore.theme.value">
        <img :src="themeStore.theme.background" class="fixed top-0 h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 from-1% rounded opacity-55" />
        <NavigationBar>
          <slot></slot>
        </NavigationBar>
      </main>
    </ion-content>
  </IonPage>
</template>
