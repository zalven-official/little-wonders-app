<template>
  <div class="w-full max-w-3xl mx-auto my-8">
    <editor-content :editor="editor" class="prose mx-auto markdown-body"></editor-content>
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import { watch, onMounted } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  modelValue: String,
  isBionic: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  extensions: [
    StarterKit,
    Document,
    Paragraph,
    Text,
    Bold,
  ],
  content: '',
})

const convertMarkdownToHtml = (markdown: string) => {
  return marked(markdown)
}
watch(() => props.isBionic, () => applyTextFormatting())

watch(() => props.modelValue, (newValue) => {
  if (editor.value && newValue !== editor.value.getHTML() && newValue) {
    const htmlContent = convertMarkdownToHtml(newValue)
    editor.value.commands.setContent(htmlContent, false)
  }
})

watch(editor, (newEditor) => {
  if (newEditor) {
    newEditor.on('update', () => {
      emit('update:modelValue', newEditor.getHTML())
    })
  }
}, { immediate: true })

onMounted(() => {
  if (editor.value && props.modelValue) {
    const htmlContent = convertMarkdownToHtml(props.modelValue)
    editor.value.commands.setContent(htmlContent, false)
    applyTextFormatting()
  }
})

const applyTextFormatting = () => {
  if (!editor.value) return;

  const htmlContent = editor.value.getHTML();
  const formattedHtml = formatBionicText(htmlContent)
  editor.value.commands.setContent(formattedHtml, false);
}

const formatBionicText = (htmlContent: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  if (props.isBionic) {
    const traverseNodes = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textNode = node as Text;
        const words = textNode.textContent?.split(/\s+/) || [];
        const newNodes = words.map(word => {
          if (word.length > 1) {
            const halfLength = Math.ceil(word.length / 2);
            const firstHalf = word.slice(0, halfLength);
            const secondHalf = word.slice(halfLength);

            const span = document.createElement('span');
            span.innerHTML = `<strong>${firstHalf}</strong>${secondHalf} `;
            return span;
          } else {
            const span = document.createElement('span');
            span.innerHTML = `<strong>${word}</strong>  `;
            return span;
          }
        });
        textNode.replaceWith(...newNodes);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const elementNode = node as HTMLElement;
        elementNode.childNodes.forEach(traverseNodes);
      }
    };

    traverseNodes(tempDiv);
  } else {
    const removeStrongTags = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'STRONG') {
        const parent = node.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(node.textContent || ''), node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const elementNode = node as HTMLElement;
        elementNode.childNodes.forEach(removeStrongTags);
      }
    };
    console.log(tempDiv)
    removeStrongTags(tempDiv);
  }
  return tempDiv.innerHTML;
}

</script>

<style>
.markdown-body {
  @apply prose prose-sm max-w-none;
}

strong {
  font-weight: 300;
  /* Thin bold effect */
}
</style>
