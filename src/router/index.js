import { createWebHistory, createRouter } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/pages/main/MainView.vue')
    },
    {
      path: '/category/:id',
      component: () => import('@/views/pages/main/CategoryView.vue')
    }
  ]
})
