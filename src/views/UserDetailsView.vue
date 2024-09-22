<template>
  <div class="user-details">
    <div class="content">
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
