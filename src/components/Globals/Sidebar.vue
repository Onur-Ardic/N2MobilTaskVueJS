<script>
import Logo from '../Pages/logo.vue'
import { computed, onMounted } from 'vue'
import { getUserStore } from '@/stores/users.js'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

export default {
  name: 'Sidebar',
  components: {
    Logo,
  },
  props: {
    activeSection: String,
  },
  emits: ['update:section'],
  setup(props, { emit }) {
    const getUser = getUserStore()
    const { users } = storeToRefs(getUser)
    const route = useRoute()
    const userId = computed(() => Number(route.params.id))
    const user = computed(() => users.value.find((u) => u.id === userId.value))
    const isUserDetailPage = computed(() => route.name === 'user-details')

    onMounted(() => {
      if (users.value.length === 0) {
        getUser.fetchUsers()
      }
    })

    const setSection = (section) => {
      emit('update:section', section)
    }

    return { user, isUserDetailPage, setSection }
  },
}
</script>

<template>
  <div class="sidebar bg-[#f5f5f5] w-[14%] h-screen p-5 border-r-2 border-[#D8D9DD] relative">
    <div v-if="isUserDetailPage && user" class="user-info mb-4">
      <h3 class="text-lg font-semibold">{{ user.name }}</h3>
      <p class="text-sm">{{ user.email }}</p>
      <p class="text-sm">{{ user.phone }}</p>
    </div>
    <ul>
      <li v-if="!isUserDetailPage" class="flex gap-3 group">
        <RouterLink to="/" class="text-xl text-[#4F359B]">Users</RouterLink>
      </li>
      <li v-if="isUserDetailPage" class="flex gap-3 group">
        <RouterLink :to="`/userdetail/${user.id}?section=todos`" class="text-xl text-[#4F359B]"
          >Todos</RouterLink
        >
      </li>
      <li v-if="isUserDetailPage" class="flex gap-3 group">
        <RouterLink :to="`/userdetail/${user.id}?section=posts`" class="text-xl text-[#4F359B]"
          >Posts</RouterLink
        >
      </li>
      <li v-if="isUserDetailPage" class="flex gap-3 group">
        <RouterLink :to="`/userdetail/${user.id}?section=albums`" class="text-xl text-[#4F359B]"
          >Albums</RouterLink
        >
      </li>
    </ul>
    <Logo />
  </div>
</template>
