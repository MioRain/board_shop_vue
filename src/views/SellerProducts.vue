<script setup>
import ProductList from '../components/ProductList.vue'
import HeaderArea from '../components/HeaderArea.vue'
import { onMounted, reactive, provide, inject } from 'vue';
import { apiHelper } from '../utils/helpers';

const userData = inject('userData')
const sellerData = reactive({
  products: []
})

const fetchSellerProducts = async () => {
  const { data } = await apiHelper.get('/seller/products', {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  sellerData.products = data
}

provide('sellerData', sellerData)

onMounted(() => {
  fetchSellerProducts()
})
</script>

<template>
  <HeaderArea />

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