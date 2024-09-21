<script>
import { getUserStore } from '@/stores/users.js'
import { storeToRefs } from 'pinia'
import UserCard from '@/components/Pages/Home/UserCard.vue'

export default {
  components: {
    UserCard,
  },
  setup() {
    const getUser = getUserStore()
    const { users } = storeToRefs(getUser)

    getUser.fetchUsers()

    return { users }
  },
}
</script>

<template>
  <section class="user">
    <h2 class="my-3 font-bold text-lg">All Users</h2>
    <div
      class="user-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      v-if="users.length"
    >
      <UserCard :users="users" />
    </div>
  </section>
</template>
