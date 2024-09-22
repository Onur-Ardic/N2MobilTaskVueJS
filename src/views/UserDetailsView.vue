<template>
  <div class="user-details">
    <div class="go-home-btn flex gap-3 items-center">
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 7.66663L7.66663 13M7.66663 13L13 18.3333M7.66663 13H18.3333"
          stroke="#26303E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13 1C22.6 1 25 3.4 25 13C25 22.6 22.6 25 13 25C3.4 25 1 22.6 1 13C1 3.4 3.4 1 13 1Z"
          stroke="#26303E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <router-link to="/">Go Home</router-link>
    </div>
    <div class="content mt-3">
      <Todos v-if="activeSection === 'todos'" :userId="userId" />
      <Posts v-if="activeSection === 'posts'" :userId="userId" />
      <Albums v-if="activeSection === 'albums'" :userId="userId" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Todos from '../components/Pages/Detail/Todos.vue'
import Posts from '../components/Pages/Detail/Posts.vue'
import Albums from '../components/Pages/Detail/Albums.vue'

export default {
  components: { Todos, Posts, Albums },
  setup() {
    const route = useRoute()
    const userId = computed(() => Number(route.params.id))
    const activeSection = computed(() => route.query.section || 'todos')

    return { activeSection, userId }
  },
}
</script>
