import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrawerStore = defineStore('drawer', () => {

  const drawerMenuId = ref('drawer-menu')

  function toggleDrawer() {
    const checkbox = document.getElementById(drawerMenuId.value) as HTMLIonCheckboxElement;
    checkbox.checked = !checkbox.checked;
  }

  return {
    drawerMenuId,
    toggleDrawer,
  }
})