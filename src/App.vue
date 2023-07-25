<script setup>
import { RouterView } from 'vue-router'
import { nextTick, onMounted, provide, ref, reactive } from 'vue';
import "@/assets/base.css"

const userData = reactive({
  token: '',
  user: {},
  shoppingCart: {
    products: [],
    totalPrice: 0
  }
})
const isRouterAlive = ref(true)

const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  }) 
}

const getUserDataFromCookie = () => {
  const data = JSON.parse(localStorage.getItem('userData'))
  if (data) {
    userData.token = data.token
    userData.user = data.user
    userData.shoppingCart = data.shoppingCart
  }
}

provide('userData', userData)
provide('reload', reload)

onMounted(() => {
  getUserDataFromCookie()
})

</script>

<template>
  <RouterView v-if="isRouterAlive" />
</template>

<style lang="scss" scoped></style>
