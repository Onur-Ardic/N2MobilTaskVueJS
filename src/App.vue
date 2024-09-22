<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Globals/Sidebar.vue'
import { ref } from 'vue'

const activeSection = ref('todos')
</script>

<template>
  <main class="flex h-screen w-screen">
    <Sidebar :activeSection="activeSection" />
    <section class="flex-grow p-5 overflow-y-auto ms-5">
      <RouterView @update:section="activeSection = $event" />
    </section>
  </main>
</template>

<style scoped></style>
