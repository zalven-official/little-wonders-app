import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue'
import ThemePage from '@/views/ThemePage.vue'
import StoryGeneratePage from '@/views/StoryGeneratePage.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/story-generated/:id?',
    name: 'story-generated',
    component: StoryGeneratePage,
    props: true // Allows route params to be passed as props to the component
  },
  {
    path: '/theme',
    name: 'theme',
    component: ThemePage
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
