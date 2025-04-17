<template>
  <header class="bg-light py-2 shadow-sm">
    <div
      class="container d-flex justify-content-between align-items-center py-2"
    >
      <!-- Logo 📚 -->
      <router-link class="text-decoration-none" to="/">
        <h3 class="mb-0 fw-bold d-flex align-items-center">
          <span style="color: #1abc9c" class="hover-icon"
            ><i class="fas fa-book-open me-2"></i> Library</span
          >
        </h3>
      </router-link>

      <!-- Icons -->
      <div class="d-flex align-items-center gap-3">
        <!-- Wishlist Icon -->
        <router-link
          class="btn position-relative text-decoration-none"
          to="/wishlist"
        >
          <i class="fas fa-heart text-danger fs-4 hover-icon"></i>
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ store.wishlist.length }}
          </span></router-link
        >

        <!-- Cart Icon -->
        <router-link
          class="btn position-relative text-decoration-none"
          to="/cart"
          ><i class="fas fa-shopping-cart text-primary fs-4 hover-icon"></i>
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
          >
            {{ store.cart.length }}
          </span></router-link
        >
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref } from "vue";
import { useBookStore } from "./Stores/bookStore.js";
const store = useBookStore();

import { useRouter } from "vue-router";
const router = useRouter();
</script>
<style scoped>
.hover-icon {
  transition: transform 0.3s ease;
}

.hover-icon:hover {
  transform: scale(1.3);
}

.badge {
  font-size: 0.7rem;
  min-width: 20px;
}
</style>
