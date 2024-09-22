<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white rounded-2xl p-10 w-11/12 md:w-3/4 lg:w-1/2 relative">
      <button @click="$emit('close')" class="absolute top-2 right-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8L12 12M12 8L8 12M10 1C17.2 1 19 2.8 19 10C19 17.2 17.2 19 10 19C2.8 19 1 17.2 1 10C1 2.8 2.8 1 10 1Z"
            stroke="#26303E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-96">
        <div class="overflow-y-auto pr-4 border-r border-gray-300">
          <h4 class="text-xl font-bold">{{ post.title }}</h4>
          <p class="mt-2">{{ post.body }}</p>
        </div>

        <div class="overflow-y-auto pl-4">
          <h5 class="font-bold">Yorumlar</h5>
          <ul class="mt-2 space-y-4">
            <li v-if="comments.length === 0" class="text-gray-500">No Comments</li>
            <li
              v-else
              v-for="comment in comments"
              :key="comment.id"
              class="flex items-start mt-3 space-x-3"
            >
              <img src="/userimage.jpg" alt="avatar" class="w-10 h-10 rounded-full object-cover" />

              <div>
                <p class="text-base">{{ comment.email }}</p>
                <p class="text-gray-600 text-xs mt-2">{{ comment.body }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
  data() {
    return {
      comments: [],
    }
  },
  mounted() {
    this.fetchComments()
  },
  methods: {
    fetchComments() {
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.post.id}`)
        .then((response) => response.json())
        .then((data) => {
          this.comments = data
        })
    },
  },
}
</script>

<style scoped>
.overflow-y-auto {
  max-height: 24rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #d8d9dd #f0f0f0;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
  border-radius: 30px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 30px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #d8d9dd;
  border-radius: 10px;
  border: 2px solid #f0f0f0;
}

.space-y-4 > :not(:first-child) {
  margin-top: 1rem;
}
</style>
