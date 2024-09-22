<template>
  <div>
    <h3 class="text-xl font-bold">Albums</h3>
    <ul>
      <li v-if="localAlbums.length === 0" class="text-gray-500">No Albums Available</li>
      <li v-else v-for="album in localAlbums" :key="album.id" class="mt-4">
        <h4 class="font-bold">{{ album.title }}</h4>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { getAlbumsStore } from '@/stores/albums'
import { storeToRefs } from 'pinia'

export default {
  props: ['userId'],
  setup(props) {
    const getAlbums = getAlbumsStore()
    const { albums } = storeToRefs(getAlbums)

    const localAlbums = computed(() => {
      return albums.value.filter((album) => album.userId === props.userId)
    })

    onMounted(() => {
      getAlbums.fetchAlbums()
    })

    return { localAlbums }
  },
}
</script>
