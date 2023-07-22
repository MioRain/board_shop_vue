import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/signin',
      name: 'Sign-In',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/products/:id',
      name: 'product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
