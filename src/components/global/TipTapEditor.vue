<template>
  <div>
    <!-- Menu Bar -->
    <div class="flex justify-center space-x-4 py-2 flex-wrap shadow group" v-if="editor && isActive"
      @focus="isActive = true">

      <!-- Text Styles -->
      <button @click="editor?.chain().focus().toggleBold().run()" class="p-1 rounded-md"
        :class="{ 'bg-base-300 text-base': editor.isActive('bold') }" type="button">
        <BoldIcon class="w-3" />
      </button>

      <button class="p-1 rounded-md" @click="editor?.chain().focus().toggleItalic().run()"
        :class="{ 'bg-base-300 text-base': editor.isActive('italic') }" type="button">
        <ItalicIcon class="w-3" />
      </button>

      <button class="p-1 rounded-md" @click="editor?.chain().focus().toggleStrike().run()"
        :class="{ 'bg-base-300 text-base': editor.isActive('strike') }" type="button">
        <StrikethroughIcon class="w-3" />
      </button>
      <button class="p-1 rounded-md" @click="editor?.chain().focus().toggleUnderline().run()"
        :class="{ 'bg-base-300 text-base': editor.isActive('underline') }" type="button">
        <UnderlineIcon class="w-3" />
      </button>

      <!-- Headers -->
      <button class="p-1 rounded-md" @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'bg-base-300 text-base': editor.isActive('heading', { level: 1 }) }" type="button">
        <Heading1Icon class="w-3" />
      </button>
      <button class="p-1 rounded-md" @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'bg-base-300 text-base': editor.isActive('heading', { level: 2 }) }" type="button">
        <Heading2Icon class="w-3" />
      </button>
      <button class="p-1 rounded-md" @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'bg-base-300 text-base': editor.isActive('heading', { level: 3 }) }" type="button">
        <Heading3Icon class="w-3" />
      </button>

      <!-- Lists -->
      <button class="p-1 rounded-md" @click="editor?.chain().focus().toggleBulletList().run()"
        :class="{ 'bg-base-300 text-base': editor.isActive('bulletList') }" type="button">
        <ListIcon class="w-3" />
      </button>
      <button class="p-1 rounded-md" @click="editor?.chain().focus().toggleOrderedList().run()"
        :class="{ 'bg-base-300 text-base': editor.isActive('orderedList') }" type="button">
        <ListOrderedIcon class="w-3" />
      </button>

      <div class="text-md h-full mt-1 opacity-40">|</div>
      <!-- Table -->
      <button class="p-1 rounded-md"
        @click="editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()" type="button">
        <Grid3X3Icon class="w-3" />
      </button>
      <button class="p-1 rounded-md" @click="editor?.chain().focus().addColumnBefore().run()" type="button">
        <PanelLeftIcon class="w-3" />
      </button>
      <button class="p-1 rounded-md" @click="editor?.chain().focus().addColumnAfter().run()" type="button">
        <PanelRightIcon class="w-3" />
      </button>
      <button class="p-1 rounded-md" @click="editor?.chain().focus().deleteColumn().run()" type="button">
        <BetweenVerticalEndIcon class="w-3" />
      </button>
      <button class="p-1 rounded-md" @click="editor?.chain().focus().addRowBefore().run()" type="button">
        <PanelTopIcon class="w-3" />
      </button>
      <button class="p-1 rounded-md" @click="editor?.chain().focus().addRowAfter().run()" type="button">
        <PanelBottomIcon class="w-3" />
      </button>
      <button class="p-1 rounded-md" @click="editor?.chain().focus().deleteRow().run()" type="button">
        <BetweenHorizonalEndIcon class="w-3" />
      </button>
      <button class="p-1 rounded-md" @click="editor?.chain().focus().deleteTable().run()" type="button">
        <Grid2x2XIcon class="w-3" />
      </button>

      <div class="text-md h-full mt-1 opacity-40">|</div>

      <!-- Additional Features -->

      <button class="p-1 rounded-md" @click="editor?.chain().focus().undo().run()" type="button">
        <Undo2Icon class="w-3" />
      </button>
      <button class="p-1 rounded-md" @click="editor?.chain().focus().redo().run()" type="button">
        <Redo2Icon class="w-3" />
      </button>
    </div>


    <!-- Editor Content -->
    <div class="border rounded-lg py-2 my-3">
      <editor-content :editor="editor" class="prose mx-auto markdown-body px-2" on></editor-content>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  Grid3X3Icon,
  PanelLeftIcon,
  PanelRightIcon,
  BetweenVerticalEndIcon,
  PanelTopIcon,
  PanelBottomIcon,
  BetweenHorizonalEndIcon,
  Grid2x2XIcon,
  Undo2Icon,
  Redo2Icon
} from 'lucide-vue-next';
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

import Underline from '@tiptap/extension-underline'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Highlight from '@tiptap/extension-highlight'


import { watch, onMounted, ref } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  modelValue: String,
  isBionic: {
    type: Boolean,
    required: false,
    default: false
  },
  editable: {
    type: Boolean,
    required: false,
    default: true
  },
  startString: {
    type: String,
    required: false,
    default: ''
  },
  endString: {
    type: String,
    required: false,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const isActive = ref(false)
const blurTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const editor = useEditor({
  extensions: [
    StarterKit, // Includes: Paragraph, Bold, Italic, Strike, Heading, BulletList, OrderedList, Document, Text, HorizontalRule, HardBreak
    Table.configure({
      resizable: true,
    }),
    Underline,
    TableRow,
    TableCell,
    TableHeader,
    Highlight,
  ],
  content: '',
  onFocus() {
    if (blurTimeout.value) {
      clearTimeout(blurTimeout.value)
      blurTimeout.value = null
    }
    isActive.value = true
  },
  onBlur({ event }) {
    blurTimeout.value = setTimeout(() => {
      const target = event.relatedTarget as HTMLElement | null
      if (!target || !target.closest('.menu-bar')) {
        isActive.value = false
      }
    }, 100)
  },
})

const convertMarkdownToHtml = (markdown: string) => {
  return marked(markdown)
}
watch(() => props.isBionic, () => applyTextFormatting())

watch(() => props.modelValue, (newValue) => {
  if (editor.value && newValue !== editor.value.getHTML() && newValue) {
    const htmlContent = convertMarkdownToHtml(newValue)
    editor.value.commands.setContent(htmlContent, false)
  } else if (editor.value) {
    editor.value.commands.setContent('', false)
  }
})

watch(editor, (newEditor) => {
  if (newEditor) {
    newEditor.on('update', () => {
      if (props.editable)
        emit('update:modelValue', newEditor.getHTML())
    })
  }
}, { immediate: false })

onMounted(async () => {
  if (editor.value && props.modelValue) {
    const htmlContent = await convertMarkdownToHtml(props.modelValue)
    editor.value.commands.setContent(`<span>${props.startString}</span>${htmlContent}<span>${props.endString}</span>`, false)
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
