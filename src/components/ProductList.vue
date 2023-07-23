<script setup>
import { apiHelper } from '../utils/helpers';
import { inject, onUpdated, reactive, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router';
import { useSetToLocalStorage } from '../composables/set-to-localstorage';
import Swal from 'sweetalert2'

const router = useRouter()
const userData = inject('userData')

const decreaseAmount = (index) => {
  const product = reactive(userData.shoppingCart.products[index])
  if (product.amount > 0) {
    product.amount--
    userData.shoppingCart.totalPrice -= product.price
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

onUpdated(() => {
  const price = 0
  userData.shoppingCart.products.forEach(product => {
    product 
  })
  userData.shoppingCart.totalPrice
})

onBeforeUnmount(() => {
  useSetToLocalStorage(userData)
})
</script>

<template>
  <div class="product-list">
    <table v-if="userData.shoppingCart?.products.length">
      <thead>
        <tr>
          <th colspan="2">商品明細</th>
          <th>價格</th>
          <th>數量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in userData.shoppingCart?.products" :key="product.id">
          <td class="product-image">
            <img src="@/assets/default-longboard.jpg" alt="product photo">
          </td>
          <td class="product-info">{{ product.description }}</td>
          <td class="product-price">{{ product.price }}</td>
          <td class="product-amount">
            <button @click="decreaseAmount(index)">−</button>
            <input v-model="product.amount" type="text" pattern="[0-9]*" inputmode="numeric"
              oninput="this.value = this.value.replace(/[^0-9]/g, '');" maxlength="3">
            <button @click="increaseAmount(index)">＋</button>
            <button @click="removeProduct(index)" class="remove-product">取消</button>
          </td>
        </tr>
        <tr>
          <td class="space" colspan="2"></td>
          <td class="total-price">小計：{{ userData.shoppingCart?.totalPrice }} 元</td>
          <td class="checkout">
            <button @click="checkout">結帳</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h1 v-else>尚未購買商品</h1>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
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

      .product-image {
        width: 25%;

        img {
          width: 100%;
          object-fit: contain;
        }
      }

      .product-price,
      .product-amount {
        text-align: center;
        font-size: 1.3rem;
        position: relative;

        button:not(.remove-product),
        input {
          padding: 5px;
          border: 2px solid var(--color-dark-2);
          background-color: white;
        }

        button {
          cursor: pointer;
        }

        input {
          width: 50px;
          margin: 0 -2px;
          text-align: center;
        }

        .remove-product {
          position: absolute;
          top: 130px;
          left: 50%;
          transform: translateX(-50%);
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
