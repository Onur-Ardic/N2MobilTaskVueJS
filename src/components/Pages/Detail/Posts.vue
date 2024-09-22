<template>
  <div class="relative">
    <h3 class="text-xl font-bold">Posts</h3>
    <div v-if="isLoading">Loading...</div>
    <ul v-else>
      <li v-if="localPosts.length === 0" class="text-gray-500">No Posts Available</li>
      <li v-else v-for="post in localPosts" :key="post.id" class="mt-4">
        <h4 class="font-bold">{{ post.title }}</h4>
        <p>{{ post.body }}</p>
        <button @click="openModal(post)" class="mt-2 text-blue-500">See More</button>
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
      console.log('Modal open:', isModalOpen.value)
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
