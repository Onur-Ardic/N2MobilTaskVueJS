<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Globals/Sidebar.vue'
import { ref } from 'vue'

const activeSection = ref('todos')
</script>

<template>
  <div class="flex h-screen w-screen">
    <Sidebar :activeSection="activeSection" />
    <div class="flex-grow p-5 overflow-y-auto">
      <RouterView @update:section="activeSection = $event" />
    </div>
  </div>
</template>

<style scoped></style>
