<template>
  <div>
    <form
      :class="` card w-full bg-base-100 bg-opacity-${backgroundOpacity} backdrop-blur-${backgroundBlur.value} shadow-xl my-2 p-5 overflow-y-auto`">

      hello
    </form>
  </div>
</template>

<script setup lang="ts">

import { useThemeStore } from '@/store/ui/theme.store'
import { storeToRefs } from 'pinia';
const themeStore = useThemeStore()

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

const {
  backgroundOpacity,
  backgroundBlur,
} = storeToRefs(themeStore)

const emit = defineEmits<{
  (e: 'update:isLoading', value: boolean): void;
}>()

</script>