<template>
  <div>
    <ul class="flex flex-wrap gap-10">
      <li v-if="localAlbums && localAlbums.length === 0" class="text-gray-500">
        No Albums Available
      </li>
      <li v-else v-for="album in localAlbums" :key="album.id" class="mt-4">
        <div
          class="album-container border border-gray-300 rounded-lg p-4 mx-auto w-[350px] h-[380px]"
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
    const { albums } = storeToRefs(getAlbums)

    const localAlbums = computed(() => {
      return albums.value
        ? albums.value.filter((album) => album.albumId === props.userId).slice(0, 5)
        : []
    })

    onMounted(async () => {
      await getAlbums.fetchAlbums()
    })

    return { localAlbums }
  },
}
</script>

<style scoped></style>
