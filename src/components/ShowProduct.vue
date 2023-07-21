<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { apiHelper } from '../utils/helpers'

const route = useRoute()
const data = reactive({
  product: {},
  category: {}
})

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
        <button>加入購物車</button>
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
