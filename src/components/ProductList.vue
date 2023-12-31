<script setup>
import { apiHelper } from '../utils/helpers';
import { inject, reactive, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router';
import { useSetToLocalStorage } from '../composables/set-to-localstorage';
import Swal from 'sweetalert2'

const router = useRouter()
const userData = inject('userData')
const sellerData = inject('sellerData')
const showProductCard = inject('showProductCard')
const reload = inject('reload')

const decreaseAmount = (index) => {
  const product = reactive(userData.shoppingCart.products[index])
  if (product.amount > 0) {
    product.amount--
    userData.shoppingCart.totalPrice -= product.price
  } else {
    Swal.fire({
      title: '取消購買？',
      text: `商品：${product.name} | 價格：${product.price}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '取消商品'
    }).then((result) => {
      if (result.isConfirmed) {
        removeProduct(index)
      }
    })
  }
}
const increaseAmount = (index) => {
  const product = reactive(userData.shoppingCart.products[index])
  product.amount++
  userData.shoppingCart.totalPrice += product.price
}

const checkout = async () => {
  try {
    const order = await apiHelper.post('/buyer/orders',
      userData.shoppingCart, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })
    router.push('/')
    userData.shoppingCart.products = []
    userData.shoppingCart.totalPrice = 0
    Swal.fire({
      title: 'Success!',
      text: '訂單成立',
      icon: 'success',
      confirmButtonText: '關閉'
    })
  } catch (err) {
    Swal.fire({
      title: 'Error!',
      text: err.response.data.message,
      icon: 'error',
      confirmButtonText: '關閉'
    })
  }
}

const removeProduct = (index) => {
  const product = reactive(userData.shoppingCart.products[index])
  userData.shoppingCart.products.splice(index, 1)
  userData.shoppingCart.totalPrice -= product.price * product.amount
  useSetToLocalStorage(userData)
}

const destroyProduct = async (productId) => {
  const reslut = await Swal.fire({
    title: '是否刪除商品',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  })
  if (reslut.isConfirmed) {
    const response = await apiHelper.delete('/seller/products/' + productId, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })
    reload()
    Swal.fire({
      title: 'Success!',
      text: '已刪除商品',
      icon: 'success',
      confirmButtonText: '關閉'
    })
  }
}

onBeforeUnmount(() => {
  useSetToLocalStorage(userData)
})
</script>

<template>
  <div class="product-list">
    <button v-if="userData.user.role === 'seller'" class="new-product" @click="showProductCard(null)">新增商品</button>
    <table v-if="userData.shoppingCart?.products.length || sellerData?.products.length">
      <thead>
        <tr>
          <th colspan="2">商品明細</th>
          <th>價格</th>
          <th>{{ sellerData ? '庫存量' : '數量' }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in (userData.shoppingCart?.products.length ? userData.shoppingCart?.products : sellerData.products)" :key="product.id">
          <td colspan="2">
            <h2 class="product-name">{{ product.name }}</h2>
            <div class="product-info">
              <div class="product-image">
                <img v-if="product.imagePath" :src="product.imagePath" alt="product photo" width="200">
                <img v-else src="@/assets/default.png" alt="product photo" width="200">
              </div>
              <div class="product-description">{{ product.description }}</div>
            </div>
          </td>
          <td class="product-price">{{ product.price }}</td>
          <td v-if="userData.user.role === 'buyer'" class="product-amount">
            <button @click="decreaseAmount(index)">−</button>
            <span>{{ product.amount }}</span>
            <button @click="increaseAmount(index)">＋</button>
            <button @click="removeProduct(index)" class="remove-product">取消</button>
            <p class="product-inventory">庫存：{{ product.inventory }}</p>
          </td>
          <td v-else-if="userData.user.role === 'seller'" class="product-amount">
            <button @click="destroyProduct(product.id)" class="destroy-product">Ｘ</button>
            <span>{{ product.inventory }}</span>
            <button class="edit-product" @click="showProductCard(product.id)">編輯</button>
            <p class="product-inventory" :class="{ dark: !product.isPublic, light: product.isPublic }">{{ product.isPublic
              ? '上架中' : '下架中' }}</p>
          </td>
        </tr>
        <tr v-if="userData.user.role === 'buyer'">
          <td class="space" colspan="2"></td>
          <td class="total-price">小計：{{ userData.shoppingCart?.totalPrice }} 元</td>
          <td class="checkout">
            <button @click="checkout">結帳</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h1 v-else>{{ sellerData ? '尚未新增商品' : '尚未購買商品' }}</h1>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

.new-product {
  width: 120px;
  margin-bottom: 20px;
  padding: 5px;
  border: 2px solid var(--color-dark-2);
  border-radius: 20px;
  background-color: var(--color-light-1);
  font-size: 1.4rem;
  cursor: pointer;
}

.product-list {
  width: 80%;
  margin: 50px auto;
  padding: 30px;
  border: 4px solid var(--color-dark-2);
  border-radius: 30px;
  background-color: var(--color-dark-1);

  table {
    width: 100%;
    border-collapse: collapse;

    thead th {
      padding: 5px;
      border: 2px solid var(--color-dark-2);

      &:nth-child(1) {
        width: 50%;
      }
    }

    tbody tr {
      border: 2px solid var(--color-dark-2);

      td {
        padding: 10px;
      }

      .product-name {
        margin-bottom: 10px;
      }

      .product-info {
        display: flex;

        .product-description {
          padding-left: 10px;
        }
      }

      .product-price,
      .product-amount {
        text-align: center;
        font-size: 1.3rem;
        position: relative;

        button:not(.remove-product) {
          width: 40px;
          padding: 5px;
          border: 2px solid var(--color-dark-2);
          border-radius: 20px;
          background-color: var(--color-light-1);
        }

        span {
          margin: 0 20px;
        }

        button {
          cursor: pointer;
        }

        input {
          width: 50px;
          margin: 0 -2px;
          text-align: center;
        }

        .remove-product,
        .edit-product,
        .product-inventory {
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .remove-product {
          top: calc(50% + 40px);
        }

        button.edit-product {
          width: 100px;
          padding: 5px;
          border: 2px solid var(--color-dark-2);
          border-radius: 20px;
          background-color: var(--color-light-1);
          top: calc(50% + 40px);
          color: black;
        }

        .product-inventory {
          top: calc(50% - 50px);
          font-size: 1.5rem;
        }

        .dark {
          color: var(--color-dark-2);

        }

        .light {
          color: var(--color-buff);
        }

        button.destroy-product {
          position: absolute;
          top: 0;
          right: 0;
          border: none;
          background-color: var(--color-dark-1);
          font-size: 1.5rem;
        }
      }

      .total-price,
      .checkout {
        font-size: 1.3rem;
        text-align: center;

        button {
          width: 100px;
          height: 30px;
          border-radius: 5px;
          background-color: var(--color-light-1);
          cursor: pointer;
        }
      }
    }
  }

}
</style>