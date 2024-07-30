<template>
  <div class="markdown-body" v-html="htmlContent"></div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps<{
  markdown: string;
}>();

const md = new MarkdownIt();
const htmlContent = ref<string>('');

watch(() => props.markdown, (newMarkdown) => {
  htmlContent.value = md.render(newMarkdown);
}, { immediate: true });
</script>

<style>
.markdown-body {
  @apply prose prose-sm max-w-none;
}
</style>