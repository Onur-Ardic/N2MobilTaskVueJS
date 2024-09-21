import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/UserDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'users',
      component: HomeView,
    },

    {
      path: '/userdetail/:id',
      name: 'user-details',
      component: DetailView,
      props: true,
    },
  ],
})

export default router
