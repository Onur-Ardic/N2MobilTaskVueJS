<template>
  <div class="relative">
    <h3 class="text-xl font-bold">Posts</h3>
    <div v-if="isLoading">Loading...</div>
    <ul class="relative" v-else>
      <li v-if="localPosts.length === 0" class="text-gray-500">No Posts Available</li>
      <li v-else v-for="post in localPosts" :key="post.id" class="mt-10 relative">
        <div class="content w-[600px]">
          <h4 class="font-medium text-[#26303E]">{{ post.title }}</h4>
          <p class="mt-3 text-slate-500">{{ post.body }}</p>
        </div>
        <div @click="openModal(post)" class="see-more-btn absolute right-3 bottom-2 flex gap-3">
          <button class="font-semibold">See More</button>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 20L20 16M20 16L16 12M20 16H12"
              stroke="#4F359B"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 7C23.2 7 25 8.8 25 16C25 23.2 23.2 25 16 25C8.8 25 7 23.2 7 16C7 8.8 8.8 7 16 7Z"
              stroke="#4F359B"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 10.6667L21.3333 16L16 21.3333L15.05 20.4L18.7833 16.6667H10.6666V15.3333H18.7833L15.05 11.6L16 10.6667Z"
              fill="#4F359B"
            />
          </svg>
        </div>

        <div class="line w-full absolute mt-3 h-[0.5px] bg-[#D8D9DD]"></div>
      </li>
    </ul>

    <Modal v-if="isModalOpen" @close="isModalOpen = false" :post="selectedPost" />
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPostsStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'
import Modal from './Uİ/Modal.vue'

export default {
  components: {
    Modal,
  },
  setup() {
    const route = useRoute()
    const getPosts = getPostsStore()
    const { posts } = storeToRefs(getPosts)

    const isLoading = ref(true)
    const isModalOpen = ref(false)
    const selectedPost = ref(null)

    const userId = computed(() => Number(route.params.id))
    const localPosts = computed(() => {
      return posts.value.filter((post) => post.userId === userId.value)
    })

    const openModal = (post) => {
      selectedPost.value = post
      isModalOpen.value = true
    }
    onMounted(async () => {
      await getPosts.fetchPosts()
      isLoading.value = false
    })

    return { localPosts, isLoading, openModal, isModalOpen, selectedPost }
  },
}
</script>

<style scoped>
input[type='checkbox']:checked {
  background-color: #a855f7;
  border-color: #a855f7;
}
input[type='checkbox']:checked:focus {
  outline: none;
}
</style>
