<script setup>
import ProductList from '../components/ProductList.vue'
import HeaderArea from '../components/HeaderArea.vue'
import SellerProductCard from '../components/SellerProductCard.vue'
import { onMounted, ref, reactive, provide, inject } from 'vue'
import { apiHelper } from '../utils/helpers';

const userData = inject('userData')
const sellerData = reactive({
  products: [],
  product: {
    userId: null,
    name: null,
    description: null,
    categoryId: null,
    size: null,
    price: null,
    inventory: null,
    isPublic: false,
    imagePath: null,
    category: {}
  }
})
const showCard = ref(false)

const fetchSellerProducts = async () => {
  const { data } = await apiHelper.get('/seller/products', {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  sellerData.products = data
}

const showProductCard = async (productId) => {
  showCard.value = true
  if (productId) {
    const { data } = await apiHelper.get(`/seller/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })
    sellerData.product = data
    sellerData.product.category = data.Category
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

provide('sellerData', sellerData)
provide('showCard', showCard)
provide('showProductCard', showProductCard)

onMounted(() => {
  fetchSellerProducts()
})
</script>

<template>
  <HeaderArea />
  <SellerProductCard v-show="showCard" />
  <main>
    <ProductList />
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 0 100px;
  padding-top: 100px;
}
</style>