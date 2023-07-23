<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { reactive, inject } from 'vue';
import { apiHelper } from '../utils/helpers'
import { useSetToLocalStorage } from '../composables/set-to-localstorage'
import Swal from 'sweetalert2'

const router = useRouter()
const userData = inject('userData')

const formData = reactive({
  name: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    const { data } = await apiHelper.post('/signin', {
      ...formData
    })
    if (data) {
      userData.token = data.data.token
      userData.user = data.data.user
      useSetToLocalStorage(data.data)
      router.push('/')
      Swal.fire({
        title: 'Success!',
        text: '登入成功',
        icon: 'success',
        confirmButtonText: '關閉'
      })
    }
  } catch (err) {
    Swal.fire({
      title: 'Error!',
      text: err,
      icon: 'error',
      confirmButtonText: '關閉'
    })
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="logo">
      <img alt="board shop logo" src="@/assets/logo.png" width="150" height="150" />
      <h1>Board Shop</h1>
    </div>

    <form @submit.prevent.stop="handleSubmit">
      <h2>Sign In</h2>

      <div class="name">
        <label for="name-input">Name</label>
        <input v-model="formData.name" id="name-input" type="text">
      </div>

      <div class="password">
        <label for="password-input">Password</label>
        <input v-model="formData.password" id="password-input" type="password">
      </div>

      <button type="submit">Sign In</button>
      <RouterLink to="/signup"> => No Account ?</RouterLink>
    </form>

  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100vh;

  .logo {
    img {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
    }

    h1 {
      position: fixed;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 3rem;
      color: var(--color-dark-1);
      text-shadow: 5px 5px 5px white;
    }
  }

  form {
    width: 300px;
    margin: auto;
    position: relative;
    top: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      font-size: 2rem;
    }

    .name,
    .password {
      width: 100%;
      margin-top: 20px;
      padding: 10px;
      background-color: white;
      border-radius: 10px;

      label {
        display: inline-block;
        width: 90px;
        color: gray;
      }
    }

    button {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      border-radius: 10px;
      background-color: var(--color-dark-1);
      cursor: pointer;
    }

    a {
      width: 100%;
      margin-top: 20px;
      height: 40px;
      border-radius: 10px;
      background-color: var(--color-dark-1);
      line-height: 40px;
      text-align: center;
      color: black;
    }
  }
}
</style>