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
      path: '/signup',
      name: 'Sign-Up',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/products/:id',
      name: 'product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/shopping_cart',
      name: 'shopping-cart',
      component: () => import('../views/ShoppingCart.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
