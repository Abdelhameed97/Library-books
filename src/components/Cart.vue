<template>
  <div class="container my-5 p-5">
    <div
      class="d-flex justify-content-center align-items-center my-2"
      v-if="store.cart.length === 0"
    >
      <h3 class="text-danger text-center">
        <i class="fas fa-exclamation-circle me-2"></i> Sorry, Your Cart is
        Empty. Please Add More Books...
      </h3>
    </div>

    <div v-else>
      <table
        class="table table-striped text-center table-bordered align-middle w-100"
      >
        <thead class="table-danger">
          <tr>
            <th>Cover</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in store.cart" :key="item.book.id">
            <td>
              <img :src="item.book.image" alt="cover" class="book-cover" />
            </td>
            <td>
              <router-link
                class="text-decoration-none text-primary hover-link"
                :to="'/bookDetails/' + item.book.id"
              >
                {{ item.book.name }}
              </router-link>
            </td>

            <td>{{ item.book.author }}</td>
            <td>{{ currencyFormatter(item.book.price) }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ currencyFormatter(item.book.price * item.quantity) }}</td>
            <td>
              <button
                class="btn btn-success btn-sm me-1"
                @click="store.increaseQuantity(item)"
              >
                +
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="store.decreaseQuantity(item)"
              >
                -
              </button>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <th colspan="5">Total</th>
            <th colspan="2">{{ currencyFormatter(total) }}</th>
          </tr>
          <tr>
            <th colspan="5">Total Tax (10%)</th>
            <th colspan="2">{{ currencyFormatter(total * 0.1) }}</th>
          </tr>
          <tr>
            <th colspan="5">Grand Total</th>
            <th colspan="2">{{ currencyFormatter(total + total * 0.1) }}</th>
          </tr>
        </tfoot>
      </table>

      <div class="d-flex justify-content-end mt-3">
        <router-link class="btn btn-outline-success me-2" to="/checkout"
          ><i class="fas fa-credit-card me-2"></i>Checkout</router-link
        >

        <button class="btn btn-outline-danger" @click="store.clearCart">
          <i class="fas fa-trash-alt me-2"></i>Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useBookStore } from "./Stores/bookStore.js";

const store = useBookStore();

const currencyFormatter = (price) => {
  return `$${price.toFixed(2)}`;
};

const total = computed(() =>
  store.cart.reduce((total, item) => total + item.book.price * item.quantity, 0)
);
</script>
<style scoped>
.book-cover {
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.hover-link:hover {
  color: #00ffdd;
  text-decoration: underline;
  transform: scale(1.3);
}
</style>
