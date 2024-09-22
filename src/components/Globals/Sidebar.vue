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

    const isActive = (section) => {
      return route.query.section === section
    }

    return { user, isUserDetailPage, setSection, isActive }
  },
}
</script>

<template>
  <div class="sidebar bg-[#f5f5f5] w-[14%] h-screen border-r-2 border-[#D8D9DD] relative">
    <div
      v-if="isUserDetailPage && user"
      class="user-info mb-4 flex gap-3 items-center bg-white p-3"
    >
      <div class="user-img">
        <img src="/userimage.jpg" alt="avatar" class="w-10 h-10 rounded-full object-cover" />
      </div>
      <div class="user-info">
        <h3 class="text-lg font-semibold">{{ user.name }}</h3>
        <p class="text-sm text-slate-500 underline">{{ user.email }}</p>
      </div>
    </div>
    <ul class="mt-12 p-5">
      <li v-if="!isUserDetailPage" class="flex gap-3 group items-center mt-3 active">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 21V19C3 17.9391 3.42143 16.9217 4.17157 16.1716C4.92172 15.4214 5.93913 15 7 15H11C12.0609 15 13.0783 15.4214 13.8284 16.1716C14.5786 16.9217 15 17.9391 15 19V21M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M21 21V19C20.9949 18.1172 20.6979 17.2608 20.1553 16.5644C19.6126 15.868 18.8548 15.3707 18 15.15M5 7C5 8.06087 5.42143 9.07828 6.17157 9.82843C6.92172 10.5786 7.93913 11 9 11C10.0609 11 11.0783 10.5786 11.8284 9.82843C12.5786 9.07828 13 8.06087 13 7C13 5.93913 12.5786 4.92172 11.8284 4.17157C11.0783 3.42143 10.0609 3 9 3C7.93913 3 6.92172 3.42143 6.17157 4.17157C5.42143 4.92172 5 5.93913 5 7Z"
            stroke="#4F359B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <RouterLink to="/" class="text-xl">Users</RouterLink>
      </li>
      <li
        v-if="isUserDetailPage"
        :class="[
          'flex gap-3 group items-center mt-3 transition ease-in duration-700 ',
          isActive('todos') ? 'active' : '',
        ]"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15"
            stroke="#4F359B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 14H9.01M9 17H9.01M12 16L13 17L16 14M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z"
            stroke="#4F359B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <RouterLink :to="`/userdetail/${user.id}?section=todos`"> Todos </RouterLink>
      </li>
      <li
        v-if="isUserDetailPage"
        :class="[
          'flex gap-3 group items-center mt-3 transition ease-in duration-700 ',
          isActive('posts') ? 'active' : '',
        ]"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 4V22M13 8H15M13 12H15M6 4H17C17.5304 4 18.0391 4.21071 18.4142 4.58579C18.7893 4.96086 19 5.46957 19 6V18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4Z"
            stroke="#4F359B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <RouterLink :to="`/userdetail/${user.id}?section=posts`"> Posts </RouterLink>
      </li>
      <li
        v-if="isUserDetailPage"
        :class="[
          'flex gap-3 group items-center mt-3 transition ease-in duration-700 ',
          isActive('albums') ? 'active ' : '',
        ]"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 8H15.01M11.5 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V11"
            stroke="#4F359B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3 16L8 11C8.928 10.107 10.072 10.107 11 11L12.5 12.5M18 22L21.35 18.716C21.5554 18.5167 21.7188 18.2782 21.8306 18.0146C21.9423 17.7511 22.0001 17.4678 22.0006 17.1816C22.0011 16.8953 21.9442 16.6119 21.8333 16.348C21.7224 16.084 21.5598 15.845 21.355 15.645C20.9371 15.2364 20.3762 15.007 19.7917 15.0059C19.2072 15.0048 18.6454 15.232 18.226 15.639L18.002 15.859L17.779 15.639C17.3612 15.2306 16.8005 15.0015 16.2162 15.0004C15.632 14.9993 15.0704 15.2263 14.651 15.633C14.4455 15.8323 14.282 16.0707 14.1702 16.3342C14.0583 16.5977 14.0004 16.881 13.9999 17.1672C13.9993 17.4535 14.0561 17.737 14.1669 18.0009C14.2777 18.2649 14.4403 18.5039 14.645 18.704L18 22Z"
            stroke="#4F359B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <RouterLink :to="`/userdetail/${user.id}?section=albums`"> Albums </RouterLink>
      </li>
    </ul>
    <Logo />
  </div>
</template>

<style scoped>
.active {
  font-weight: bold;
  color: #4f359b;
  position: relative;
  background-color: #fff;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.active::before {
  content: '';
  position: absolute;
  left: -20px;
  width: 5px;
  height: 40px;
  border-radius: 30px;
  background-color: #4f359b;
  transition: left 0.4s ease-in-out;
}
</style>
