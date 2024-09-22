import { defineStore } from 'pinia'

export const getPostsStore = defineStore('post', {
  state: () => ({
    posts: [],
    loading: false,
  }),

  actions: {
    async fetchPosts() {
      this.loading = true
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        this.posts = await response.json()
      } catch (error) {
        console.error('API hata verdi:', error)
      } finally {
        this.loading = false
      }
    },

    getPostsByUserId(userId) {
      return this.posts.filter((post) => post.userId === userId)
    },
  },
})
