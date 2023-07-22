<script setup>
import { RouterView } from 'vue-router'
import { onMounted, provide, reactive } from 'vue';
import "@/assets/base.css"

const userData = reactive({
  token: '',
  user: {}
})

const getUserDataFromCookie = () => {
  const data = JSON.parse(localStorage.getItem('userData'))
  if (data) {
    userData.token = data.token
    userData.user = data.user
  }
}

provide('userData', userData)

onMounted(() => {
  getUserDataFromCookie()
})

</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
