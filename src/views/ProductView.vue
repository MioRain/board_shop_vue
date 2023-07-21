<script setup>
import { reactive, provide, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { apiHelper } from '../utils/helpers'
import HeaderArea from '../components/HeaderArea.vue'
import ShowProduct from '../components/ShowProduct.vue'

const route = useRoute()
const data = reactive({
  product: {}
})

// provide('data', data)

const fetchProduct = async (productId) => {
  const response = await apiHelper.get('/products/' + productId)
  data.product = response.data
}

onMounted(() => {
  fetchProduct(route.params.id)
})
</script>

<template>
  <HeaderArea />

  <main>
    <ShowProduct />
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 0 100px;
  padding-top: 100px;
}
</style>
