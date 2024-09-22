<template>
  <div>
    <h3 class="text-xl font-bold">Albums</h3>
    <ul class="flex flex-wrap gap-10">
      <li v-if="localAlbums.length === 0" class="text-gray-500">No Albums Available</li>
      <li v-else v-for="album in localAlbums" :key="album.id" class="mt-4">
        <div
          class="album-container border border-gray-300 rounded-lg p-4 mx-auto w-[300px] h-[340px]"
        >
          <div class="grid grid-cols-2 gap-2 mb-2 mx-auto">
            <img
              v-for="index in 4"
              :key="index"
              :src="'https://via.placeholder.com/100?text=' + index"
              alt="album image"
              class="w-full h-full object-cover rounded-lg"
            />
          </div>

          <h4 class="w-full text-center text-xs whitespace-normal break-words mt-3">
            {{ album.title }}
          </h4>
        </div>
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

    const localAlbums = computed(() => {
      return getAlbums.getAlbumsByUserId(props.userId)
    })
    onMounted(() => {
      getAlbums.fetchAlbums()
    })

    return { localAlbums }
  },
}
</script>

<style scoped></style>
