<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white rounded-lg p-5 w-11/12 md:w-3/4 lg:w-1/2 relative">
      <button @click="$emit('close')" class="absolute top-2 right-2">Close Modal</button>
      <h4 class="text-xl font-bold">{{ post.title }}</h4>
      <p class="mt-2">{{ post.body }}</p>
      <div class="mt-4">
        <h5 class="font-bold">Yorumlar</h5>
        <ul>
          <li v-if="comments.length === 0" class="text-gray-500">No Comments</li>
          <li v-else v-for="comment in comments" :key="comment.id" class="mt-2">
            <p>
              <strong>{{ comment.name }}:</strong> {{ comment.body }}
            </p>
          </li>
        </ul>
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
