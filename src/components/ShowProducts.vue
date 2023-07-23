<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
import { useSetToLocalStorage } from '../composables/set-to-localstorage';
import Swal from 'sweetalert2'

const data = inject('data')
const userData = inject('userData')

const addProdcutToCart = (product) => {
  Swal.fire({
    title: '是否加入購物車',
    text: `商品：${product.name} | 價格：${product.price}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '加入購物車'
  }).then((result) => {
    if (result.isConfirmed) {
      const isAdded = userData.shoppingCart?.products.filter(item => {
        return product.id === item.id
      })
      if (!isAdded.length) {
        product.amount = 1
        userData.shoppingCart.products.push(product)
        userData.shoppingCart.totalPrice += product.price
        useSetToLocalStorage(userData)
      }
      Swal.fire(
        '完成',
        '已加入購物車',
        'success'
      )
    }
  })
}

</script>

<template>
  <div class="products">
    <div v-for="product in data.products" class="product">
      <router-link :to="`/products/${product.id}`">
        <img src="@/assets/default-longboard.jpg" alt="product photo" width="200" height="200">
      </router-link>
      <h3 class="name">{{ product.name }}</h3>
      <button @click="addProdcutToCart(product)" class="to-cart-btn">加入購物車</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .product {
    width: 240px;
    margin: 15px;
    padding: 15px;
    border: 4px solid var(--color-dark-2);
    border-radius: 15px;
    background-color: var(--color-dark-1);
    display: flex;
    flex-direction: column;

    img {
      cursor: pointer;
    }

    h3 {
      width: 100%;
      margin: 10px 0;
      flex: 1;
    }

    button {
      width: 100%;
      height: 30px;
      border-radius: 5px;
      background-color: var(--color-light-1);
      cursor: pointer;
    }
  }
}
</style>