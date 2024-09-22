import { defineStore } from 'pinia'

export const getAlbumsStore = defineStore('album', {
  state: () => ({
    albums: [],
    loading: false,
  }),

  actions: {
    async fetchAlbums() {
      this.loading = true
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos')
        this.albums = await response.json()
      } catch (error) {
        console.error('API hata verdi:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
