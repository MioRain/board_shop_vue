<script setup>
import { onMounted, reactive, ref, inject } from 'vue';
import { apiHelper } from '../utils/helpers'

const filter = inject('filter');
const fetchProducts = inject('fetchProducts')
const state = reactive({
  categories: []
})
const name = ref(''),
  minPrice = ref(''),
  maxPrice = ref(''),
  minSize = ref(''),
  maxSize = ref('')

const setCategory = (categoryId) => {
  filter.categoryId = categoryId
  fetchProducts()
}

const setFilter = (key, value) => {
  filter[key] = value
}

const fetchCategories = async () => {
  const { data } = await apiHelper.get('/categories')
  state.categories = data
}

onMounted(() => {
  fetchCategories()
})

</script>

<template>
  <ul class="categories">
    <li @click="setCategory(null)">
      <span class="category" :class="{ active: !filter.categoryId }">all</span>
    </li>
    <li v-for="category in state.categories" :key="category.id">
      <span>|</span>
      <span @click="setCategory(category.id)" class="category" :class="{ active: filter.categoryId === category.id }">{{
        category.name }}</span>
    </li>
  </ul>
  <div class="filter">
    <div class="price">
      <label for="">
        價格
        <input @input="setFilter('minPrice', minPrice)" v-model="minPrice" type="number" min="0">
        <span>-</span>
        <input @input="setFilter('maxPrice', maxPrice)" v-model="maxPrice" type="number" min="0">
      </label>
    </div>
    <div class="size">
      <label for="">
        尺寸
        <input @input="setFilter('minSize', minSize)" v-model="minSize" type="number" min="0">
        <span>-</span>
        <input @input="setFilter('maxSize', maxSize)" v-model="maxSize" type="number" min="0">
      </label>
    </div>
  </div>
  <div class="search-bar">
    <input @input="setFilter('name', name)" v-model="name" type="text">
    <button @click="fetchProducts">Search</button>
  </div>
</template>

<style lang="scss" scoped>
input,
button {
  padding: 0 10px;
  border-radius: 5px;
  background-color: white;
}

.categories {
  margin-top: 20px;
  display: flex;
  justify-content: center;

  .category {
    text-decoration: underline;
    cursor: pointer;

    &.active {
      font-weight: bold;
      text-decoration: none;
      cursor: none;
    }
  }

  li {
    color: rgb(8, 146, 200);

    span:not(.category) {
      margin: 0 10px;
    }
  }
}

.filter {
  margin-top: 20px;
  display: flex;
  justify-content: center;

  label {
    margin-left: 20px;

    input {
      width: 80px;
    }

    span {
      margin: 0 10px;
    }
  }

  .size input {
    width: 60px;
  }

}

.search-bar {
  height: 35px;
  margin-top: 20px;
  padding-left: 20px;
  display: flex;
  justify-content: center;

  input {
    width: 23rem;
    border-radius: 10px 0 0 10px;
  }

  button {
    width: 5rem;
    border-radius: 0 10px 10px 0;
    background-color: var(--color-dark-1);
    cursor: pointer;
  }
}
</style>