<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Globals/Sidebar.vue'
</script>

<template>
  <div class="flex h-screen w-screen">
    <Sidebar />
    <div class="flex-grow p-5 overflow-y-auto">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
