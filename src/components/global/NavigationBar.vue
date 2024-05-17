<script lang="ts" setup>
import { MenuIcon } from 'lucide-vue-next';
</script>

<template>
  <div>


    <div class="navbar bg-base-100">
      <div class="flex-none">
        <button class="btn btn-square btn-ghost">
          <MenuIcon />
        </button>
      </div>
      <div class="flex-1">
        <a class="btn btn-ghost text-xl font-sans">Little Wonders</a>
      </div>
    </div>
    <slot></slot>
  </div>
</template>