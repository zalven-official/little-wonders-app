<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-[#01030a]">
    <img :src="posterImage" class="animate-pulse -mt-28" />
    <img :src="titleImage" class="-mt-20 animate-wiggle" />
  </div>
</template>
<script lang="ts" setup>
import posterImage from '@/assets/littlewonder/poster.png'
import titleImage from '@/assets/littlewonder/title.png'
</script>