import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const getUserStore = defineStore('users', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const users = await response.json()
        this.users = users
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
  },
  getters: {
    userById: (state) => (id) => {
      return state.users.find((user) => user.id === id)
    },
  },
})
