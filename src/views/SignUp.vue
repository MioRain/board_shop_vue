<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { reactive } from 'vue';
import { apiHelper } from '../utils/helpers'
import Swal from 'sweetalert2'

const router = useRouter()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  checkPassword: '',
  isSeller: false
})

const handleSubmit = async () => {
  try {
    const { name, email, password, checkPassword } = { ...formData }
    if (!name || !email || !password || !checkPassword) throw new Error('請輸入所有欄位')
    if (password !== checkPassword) throw new Error('輸入的密碼不一致')
    if (name.length > 16) throw new Error('字數超出上限！')

    const { data } = await apiHelper.post('/signup', {
      ...formData
    })
    if (data) {
      router.push('/signin')
      Swal.fire({
        title: 'Success!',
        text: '註冊成功',
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
      <h2>Sign Up</h2>

      <div class="name">
        <label for="name-input">Name</label>
        <input v-model="formData.name" id="name-input" type="text" maxlength="16">
      </div>

      <div class="email">
        <label for="email">Email</label>
        <input v-model="formData.email" id="email" type="email">
      </div>

      <div class="password">
        <label for="password-input">Password</label>
        <input v-model="formData.password" id="password-input" type="password">
      </div>

      <div class="checkPassword">
        <label for="checkPassword-input">Check</label>
        <input v-model="formData.checkPassword" id="checkPassword" type="password">
      </div>

      <div class="isSeller">
        <label for="isSeller">是否要註冊為賣家？</label>
        <input v-model="formData.isSeller" id="isSeller" type="checkbox">
      </div>

      <button type="submit">Sign Up</button>
      <RouterLink to="/signin"> Cancel</RouterLink>
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
    .email,
    .password,
    .checkPassword {
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

    .isSeller {
      width: 100%;
      margin-top: 20px;
      position: relative;

      input {
        width: 20px;
        height: 20px;
        margin-left: 30px;
        background-color: white;
        border: 2px solid black;
        position: absolute;
        top: 2px;
        cursor: pointer;

        &:checked {
          &::after {
            content: "\2714";
            position: absolute;
            top: 0;
            left: 3px;
            font-size: 12px;
          }
        }
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