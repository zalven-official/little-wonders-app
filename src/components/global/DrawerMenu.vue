<template>
  <div class="drawer">
    <input :id="drawerStore.drawerMenuId" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <slot></slot>
    </div>
    <div class="drawer-side">
      <label :for="drawerStore.drawerMenuId" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-0 min-h-full bg-base-200 text-base-content">
        <div class="relative bg-black mb-5 ">
          <img :src="coverImage" class=" bg-black min-w-80 w-full object-cover h-32 opacity-50" />
          <img :src="coverTextImage" class="absolute w-44 object-cover top-0  " />
        </div>
        <li class="px-2 py-1" v-for="(item, index) in drawerMenuItems" :key="index"
          @click="createBionicTemplate(item.route)">
          <a class="p-5" :class="{ 'active': item.name === route.name }">
            <component :is="item.icon" class="w-5 h-5 mr-2 text-primary" />
            <span class="text-md">{{ item.title }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import coverImage from '@/assets/cover.png'
import coverTextImage from '@/assets/cover-text.png'

import { useIonRouter } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { useDrawerStore } from '@/store/ui/drawer.store'
import { Paintbrush2Icon, HomeIcon, PlusIcon } from 'lucide-vue-next';
import { type Component } from 'vue';

const drawerStore = useDrawerStore()
const ionRouter = useIonRouter();
const route = useRoute();


export interface DraweMenuItem {
  title: string
  icon: Component,
  route: string
  name: string
}


const drawerMenuItems: DraweMenuItem[] = [
  {
    title: 'Home',
    icon: HomeIcon,
    route: '/',
    name: 'home'
  },
  {
    title: "Create Story",
    icon: PlusIcon,
    route: '/story-generated',
    name: 'story-generated',
  },
  {
    title: 'Theme',
    icon: Paintbrush2Icon,
    route: '/theme',
    name: 'theme'
  },
]

function createBionicTemplate(route: string) {
  ionRouter.navigate(route, 'forward', 'replace');
}

</script>