<script setup>
import { onMounted, ref, reactive, inject } from 'vue'
import { apiHelper } from '../utils/helpers'
import Swal from 'sweetalert2'

const sellerData = inject('sellerData')
const showCard = inject('showCard')
const reload = inject('reload')
const categories = reactive({
  arr: []
})
const imageTemp = ref(null)

const fetchCategories = async () => {
  const { data } = await apiHelper.get('/categories')
  categories.arr = data
}

const handleCancel = () => {
  showCard.value = false
  sellerData.product = {
    userId: null,
    name: null,
    description: null,
    categoryId: null,
    size: null,
    price: null,
    inventory: null,
    isPublic: false,
    imageFile: null,
    category: {}
  }
  reload()
}

const togglePublic = () => {
  Swal.fire({
    title: sellerData.product.isPublic === false ? '是否確定上架？' : '是否確定下架？',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      sellerData.product.isPublic = !sellerData.product.isPublic
    }
  })
}

const uploadHandle = (e) => {
  const { files } = e.target
  if (files.length === 0) {
    sellerData.product.imageFile = ''
  } else {
    sellerData.product.imageFile = files
    const imageURL = window.URL.createObjectURL(files[0])
    imageTemp.value = imageURL
  }
}

onMounted(() => {
  fetchCategories()
})

</script>

<template>
  <form class="product">
    <div class="product-img">
      <img v-show="sellerData.product.imagePath" :src="sellerData.product.imagePath" alt="product photo">
      <img v-show="sellerData.product.imageFile" :src="imageTemp" alt="product photo">
      <img v-show="!sellerData.product.imageFile" src="@/assets/default.png" alt="product photo">
      <input @change="uploadHandle" type="file">
    </div>
    <div class="product-info">
      <div>
        <label>商品名稱</label>
        <input v-model="sellerData.product.name" class="name" type="text" maxlength="50">
      </div>
      <div>
        <label>產品介紹</label>
        <textarea v-model="sellerData.product.description" class="description" maxlength="100" wrap="hard"></textarea>
      </div>
      <div>
        <label>種類</label>
        <select v-model="sellerData.product.category.id" class="category">
          <option v-for="category in categories.arr" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div>
        <label>尺寸</label>
        <input v-model="sellerData.product.size" type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '');"
          maxlength="2" max="99">
      </div>
      <div>
        <label>價格</label>
        <input v-model="sellerData.product.price" type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '');"
          maxlength="6">
      </div>
      <div>
        <label>庫存</label>
        <input v-model="sellerData.product.inventory" type="text"
          oninput="this.value = this.value.replace(/[^0-9]/g, '');" maxlength="3" max="999">
      </div>
      <div v-if="!sellerData.product.userId" class="isPublic">
        <label for="isPublic">商品是否直接上架？</label>
        <input v-model="sellerData.product.isPublic" id="isPublic" type="checkbox">
      </div>
      <div v-else class="state">
        <label>商品狀態</label>
        <button @click="togglePublic">{{ sellerData.product.isPublic ? '上架中' : '下架中' }}</button>
      </div>
      <div class="action">
        <button @click="handleCancel">取消</button>
        <button @click="">確定</button>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.product {
  width: 80%;
  margin: 50px auto;
  padding: 30px;
  position: absolute;
  z-index: 100;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid var(--color-dark-2);
  border-radius: 30px;
  background-color: var(--color-dark-1);
  box-shadow: 12px 12px 2px 1px var(--color-dark-2);
  display: flex;
  justify-content: space-between;

  button {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    background-color: var(--color-light-1);
    cursor: pointer;
  }

  .product-img {
    width: 40%;

    img {
      width: 100%;
      object-fit: contain;
    }

    input {
      width: 100%;
      height: 50px;
      margin-top: 20px;
      padding: 5px;
      font-size: 1.3rem;
    border-radius: 5px;
    background-color: var(--color-light-1);
    cursor: pointer;
    }
  }

  .product-info {
    width: 55%;
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;

    label {
      margin-right: 20px;
    }

    input,
    select {
      width: 120px;
      margin: 5px 0;
      background-color: var(--color-dark-1);
      border: none;
      border-bottom: 3px solid var(--color-dark-2);
      text-align: center;
    }

    .name {
      width: 100%;
      margin-bottom: 15px;
    }

    .description {
      width: 100%;
      height: 140px;
      margin: 10px 0;
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      resize: none;
    }

    .category {
      width: 240px;
      font-size: 1.2rem;
    }
  }

  .isPublic {
    margin-top: 10px;
    position: relative;

    input {
      width: 20px;
      height: 20px;
      margin-left: -5px;
      background-color: white;
      border: 2px solid black;
      position: absolute;
      cursor: pointer;

      &:checked {
        &::after {
          content: "\2714";
          position: absolute;
          top: 0;
          left: 3px;
          font-size: 12px;
        }
      }
    }
  }

  .state {
    margin-top: 10px;
  }

  .action {
    margin-top: 20px;
    display: flex;
    justify-content: end;

    button {
      margin-left: 30px;
    }
  }
}
</style>