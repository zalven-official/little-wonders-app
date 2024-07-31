<template>
  <div>
    Silent
  </div>
</template>

<script setup lang="ts">


defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:isLoading', value: boolean): void;
}>()

</script>