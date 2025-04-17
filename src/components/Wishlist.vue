<template>
  <div class="container mt-3">
    <!-- لو الـ wishlist فاضية -->
    <div class="text-center py-4" v-if="store.wishlist.length === 0">
      <h3 class="text-danger">
        <i class="fas fa-exclamation-circle me-2"></i>Your wishlist is empty
      </h3>
      <p class="text-muted">Please add some books to your wishlist</p>

      <router-link class="btn btn-primary" to="/"
        ><i class="fas fa-book me-2"></i>Browse Books
      </router-link>
    </div>

    <!-- لو فيها كتب -->
    <div v-else>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <router-link class="btn btn-outline-success" to="/">
          <i class="fas fa-arrow-left me-2"></i>Continue Shopping
        </router-link>
        <h3><i class="fas fa-heart me-2 text-danger"></i>Your Wishlist</h3>
      </div>

      <div class="row justify-content-center g-4">
        <div class="col-md-4" v-for="book in store.wishlist" :key="book.id">
          <div class="card h-100 book-card shadow-sm">
            <img
              :src="book.image"
              class="card-img-top book-img"
              :alt="book.name"
            />
            <div class="card-body d-flex flex-column">
              <router-link
                :to="'/bookDetails/' + book.id"
                class="book-link text-decoration-none text-dark text-center"
                ><h5 class="card-title text-danger mb-2 hover-icon">
                  {{ book.name }}
                </h5></router-link
              >
              <!-- <p class="card-text flex-grow-1">{{ book.description }}</p> -->
              <div class="book-info mb-2 fs-5">
                <div><strong>Author:</strong> {{ book.author }}</div>
                <div><strong>Category:</strong> {{ book.category }}</div>
                <div>
                  <strong>Price:</strong> {{ currencyFormatter(book.price) }}
                </div>
              </div>
              <div class="btn-group-buttons mt-auto">
                <button
                  class="btn btn-danger w-100 mb-2"
                  @click="removeFromWishlist(book.id)"
                >
                  <i class="fas fa-trash-alt me-2"></i>Remove
                </button>
                <button
                  class="btn btn-primary w-100"
                  :disabled="book.instock === 0"
                  @click="addBookToCart(book)"
                >
                  <i class="fas fa-cart-plus me-2"></i>Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookStore } from "./Stores/bookStore.js";
const store = useBookStore();

import { useRouter } from "vue-router";
const router = useRouter();

function removeFromWishlist(bookId) {
  store.removeFromWishlist(bookId);
}

function addBookToCart(book) {
  store.addBookToCart(book);
}

function currencyFormatter(price) {
  return `$${price.toFixed(2)}`;
}
</script>

<style scoped>
.book-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.book-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 123, 255, 0.3);
}

.book-img {
  height: 250px;
  object-fit: cover;
}
.hover-icon:hover {
  transform: scale(1.3);
}
</style>
