<template>
  <div class="user-details">
    <div class="content">
      <div v-if="activeSection === 'todos'">
        <!-- Todos component veya verileri burada olacak -->
        <h3>Todos</h3>
        <!-- Todos verilerini getirmek için API çağrısı veya store'dan veriler -->
      </div>
      <div v-if="activeSection === 'posts'">
        <h3>Posts</h3>
      </div>
      <div v-if="activeSection === 'albums'">
        <h3>Albums</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getUserStore } from '@/stores/users.js'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const route = useRoute()
    const getUser = getUserStore()
    const { users } = storeToRefs(getUser)

    const userId = computed(() => Number(route.params.id))
    const user = computed(() => users.value.find((u) => u.id === userId.value))

    const activeSection = computed(() => route.query.section || 'todos')

    return { user, activeSection }
  },
}
</script>
