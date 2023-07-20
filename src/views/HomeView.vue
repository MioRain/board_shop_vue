<script setup>
import HeaderArea from '../components/HeaderArea.vue'
import FilterSearch from '../components/FilterSearch.vue'

</script>

<template>
  <HeaderArea />
  
  <main>
    <h1>main</h1>
    <FilterSearch />
  </main>

</template>

<style lang="scss" scoped>
main {
  height: 100vh;
  padding: 0 100px;
  padding-top: 100px;
  background-color: var(--color-light-1);
}
</style>
