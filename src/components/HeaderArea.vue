<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { inject } from 'vue'

const router = useRouter()

const userData = inject('userData')

const logout = () => {
  router.push('/signin')
  localStorage.removeItem('userData')
}

</script>

<template>
  <header>
    <div class="wrapper">
      <div class="greet">
        <div>Hi, {{ userData.user.name ? userData.user.name : 'Guest' }}</div>
      </div>
      <router-link to="/" class="logo">
        <img alt="board shop logo" src="@/assets/logo.png" width="100" height="100" />
        <h1>Board Shop</h1>
      </router-link>
      <nav>
        <router-link v-if="userData.user.role !== 'seller'" to="/shopping_cart">購物車</router-link>
        <router-link v-else to="/produc_list">商品管理</router-link>
        <router-link v-if="!userData.user.role" to="/signin">登入</router-link>
        <button @click="logout" v-else>登出</button>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100vw;
  height: 100px;
  padding: 0 50px;
  background-color: var(--color-buff);
  position: fixed;

  .wrapper {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .greet {
      height: 100px;
      display: flex;
      align-items: center;
      float: left;
      font-size: 2rem;
    }

    .logo {
      color: black;
      img {
        position: relative;
        left: -100px;
      }

      h1 {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    nav {

      button,
      a {
        margin-right: 30px;
        padding: 5px;
        background-color: var(--color-light-1);
        border: 1px solid var(--color-light-1);
        border-radius: 10px;
        font-size: 1.3rem;
        color: black;
        cursor: pointer;
      }
    }
  }
}
</style>