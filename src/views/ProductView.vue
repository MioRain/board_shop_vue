<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { apiHelper } from '../utils/helpers'
import HeaderArea from '../components/HeaderArea.vue'

const route = useRoute()
const data = reactive({
  product: {}
})

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
    <h1>{{ data.product.id }} | {{ data.product.name }}</h1>
    
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 0 100px;
  padding-top: 100px;
}
</style>
