<template>
  <div>
    <DrawerMenu>
      <div class="navbar bg-base-200 shadow">
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

import { useDrawerStore } from '@/store/ui/drawer.store'
const drawerStore = useDrawerStore()

</script>