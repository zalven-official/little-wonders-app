<script setup lang="ts">
import { ref } from 'vue'
const drawerId = ref('drawer-menu')

export function toggleDrawer() {
  const checkbox = document.getElementById(drawerId.value) as HTMLIonCheckboxElement;
  checkbox.checked = !checkbox.checked;
}

</script>

<template>
  <div class="drawer">
    <input id="drawer-menu" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <label @click="toggleDrawer" class="btn btn-primary drawer-button">Open drawer</label>
    </div>
    <div class="drawer-side">
      <label for="drawer-menu" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</template>