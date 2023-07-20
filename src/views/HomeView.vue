<script setup>
import { reactive, provide, onMounted } from 'vue'
import { apiHelper } from '../utils/helpers'
import HeaderArea from '../components/HeaderArea.vue'
import FilterSearch from '../components/FilterSearch.vue'

const data = reactive({
  products: []
})
const filter = reactive({
  name: '',
  categoryId: null,
  minSzie: null,
  maxSize: null,
  minPrice: null,
  maxPrice: null
});

const fetchProducts = async () => {
  const response = await apiHelper.get('/products', {
    params: {
      filter
    }
  })
  data.products = response.data
}

provide('filter', filter)
provide('fetchProducts', fetchProducts)

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <HeaderArea />

  <main>
    <FilterSearch />
    <p v-for="product in data.products">{{ product.name }}</p>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100%;
  padding: 0 100px;
  padding-top: 100px;
  background-color: var(--color-light-1);
}
</style>
