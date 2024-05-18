<template>
  <div>
    <DrawerMenu>
      <div
        :class="`navbar bg-base-200 shadow bg-opacity-${themeStore.backgroundOpacity} backdrop-blur-${themeStore.backgroundBlur.value} shadow-xl`">
        <div class="flex-none">
          <button class="btn btn-square btn-ghost" @click="drawerStore.toggleDrawer">
            <MenuIcon />
          </button>
        </div>
        <div class="flex-1">
          <a class="btn btn-ghost text-md font-sans">Little Wonders</a>
        </div>
      </div>
      <slot></slot>
    </DrawerMenu>
  </div>
</template>

<script lang="ts" setup>
import { MenuIcon } from 'lucide-vue-next';
import DrawerMenu from './DrawerMenu.vue'
import { useThemeStore } from '@/store/ui';
import { useDrawerStore } from '@/store/ui'

const drawerStore = useDrawerStore()
const themeStore = useThemeStore()
</script>