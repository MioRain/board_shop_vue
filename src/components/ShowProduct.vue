<script setup>
import { reactive, onMounted, inject, onUnmounted } from 'vue'
import { useRoute } from 'vue-router';
import { apiHelper } from '../utils/helpers'
import Swal from 'sweetalert2'

const userData = inject('userData')
const route = useRoute()
const data = reactive({
  product: {},
  category: {}
})

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
      const isAdded = userData.shoppingCart.products.filter(item => {
        return product.id === item.id
      })
      if (!isAdded.length) {
        product.amount = 1
        userData.shoppingCart.products.push(product)
        userData.shoppingCart.totalPrice += product.price
      }
      Swal.fire(
        '完成',
        '已加入購物車',
        'success'
      )
    }
  })
}

const fetchProduct = async (productId) => {
  const response = await apiHelper.get('/products/' + productId)
  data.product = response.data
  data.category = response.data.Category
}

onMounted(() => {
  fetchProduct(route.params.id)
})
</script>

<template>
  <div class="product">
    <div class="product-img">
      <img src="@/assets/default-longboard.jpg" alt="product photo">
    </div>
    <div class="product-info">
      <h1>{{ data.product.name }}</h1>
      <p>{{ data.product.description }}</p>
      <p>種類：{{ data.category.name }}</p>
      <p>尺寸：{{ data.product.size }} 英吋</p>
      <p>價格：{{ data.product.price }}</p>
      <p>庫存：{{ data.product.inventory }}</p>
      <div class="action">
        <button @click=$router.go(-1)>取消</button>
        <button v-if="userData.user.role === 'buyer'" @click="addProdcutToCart(data.product)">加入購物車</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  width: 80%;
  margin: 50px auto;
  padding: 30px;
  border: 4px solid var(--color-dark-2);
  border-radius: 30px;
  background-color: var(--color-dark-1);
  display: flex;
  justify-content: space-between;

  .product-img {
    width: 40%;

    img {
      width: 100%;
      object-fit: contain;
    }
  }
  .product-info {
    width: 55%;
    display: flex;
    flex-direction: column;

    p {
      margin-top: 10px;
      font-size: 1.2rem;
    }
  }

  .action {
    margin-top: 20px;
    display: flex;
    justify-content: end;

    button {
      width: 100px;
      height: 30px;
      margin-left: 30px;
      border-radius: 5px;
      background-color: var(--color-light-1);
      cursor: pointer;
    }
  }
}
</style>
