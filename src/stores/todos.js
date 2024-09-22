import { defineStore } from 'pinia'

export const getTodosStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false,
  }),

  actions: {
    async fetchTodos() {
      this.loading = true
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        this.todos = await response.json()
      } catch (error) {
        console.error('API hata verdi:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
