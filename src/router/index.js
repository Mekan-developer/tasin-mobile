import { createWebHistory, createRouter } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/MainView.vue')
    },
    {
      path: '/category/:id',
      component: () => import('@/pages/CategoryView.vue'),
      meta:{
        hideHeader: true
      }
    }
  ]
})
