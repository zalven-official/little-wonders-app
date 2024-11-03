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


        <div class="flex flex-col items-center justify-center absolute bottom-10 w-full text-xs">
          <!-- Footnote Section -->
          <div class="p-4 text-center text-opacity-75">
            <p>Created by <span href="#" class="text-primary">Zalven</span></p>
            <p>Partnered by <span href="#" class="text-primary">BEED 4B Norzagaray College</span></p>
            <p>&copy; 2024 All rights reserved.</p>
          </div>
        </div>



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
import { Paintbrush2Icon, HomeIcon, PlusIcon, BadgeInfoIcon } from 'lucide-vue-next';
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

  {
    title: 'About',
    icon: BadgeInfoIcon,
    route: '/about',
    name: 'about'
  },
]

function createBionicTemplate(route: string) {
  ionRouter.navigate(route, 'forward', 'replace');
}

</script>