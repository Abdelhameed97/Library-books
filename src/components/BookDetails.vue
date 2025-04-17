<template>
  <div class="container my-5 d-flex justify-content-center">
    <div class="book-details-card shadow-lg p-4 rounded">
      <div v-if="book" class="text-center">
        <h2 class="mb-4">{{ book.bookName }}</h2>
        <img :src="book.image" alt="cover" class="book-cover mb-4" />
        <div class="text-start fs-5">
          <p><strong>Author:</strong> {{ book.author }}</p>
          <p><strong>Description:</strong> {{ book.description }}</p>
          <p><strong>Category:</strong> {{ book.category }}</p>
          <p><strong>Pages:</strong> {{ book.pages }}</p>
          <p><strong>ISBN:</strong> {{ book.ISBN }}</p>
          <p>
            <strong>Price:</strong>
            <span class="text-primary fw-bold fs-4">
              {{ currencyFormatter(book.price) }}
            </span>
          </p>
        </div>
        <div class="mt-4 d-flex justify-content-center gap-3">
          <button class="btn btn-outline-primary px-4" @click="addToCart(book)">
            <i class="fas fa-cart-plus me-2"></i> Add to Cart
          </button>
          <button
            class="btn btn-outline-danger px-4"
            @click="addToWishlist(book)"
            :disabled="isInWishlist(book.id)"
          >
            <i class="fas fa-heart me-2"></i> Add to Wishlist
          </button>
        </div>
      </div>
      <div v-else class="text-center fs-4 text-muted">
        <p>Loading book details...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useBookStore } from "./Stores/bookStore.js";
import { onMounted, ref } from "vue";

const route = useRoute();
const store = useBookStore();
const book = ref(null);

onMounted(() => {
  const bookId = route.params.id;
  fetch(`http://localhost:5000/books/${bookId}`)
    .then((response) => {
      if (!response.ok) throw new Error("Could not fetch book details");
      return response.json();
    })
    .then((data) => {
      book.value = data;
    })
    .catch((error) => {
      console.error("Error fetching book details: ", error);
    });
});

const addToCart = (book) => {
  store.addBookToCart(book);
};

const addToWishlist = (book) => {
  store.addToWishlist(book);
};

const isInWishlist = (id) => {
  return store.wishlist.some((item) => item.id === id);
};

const currencyFormatter = (price) => {
  return `$${price.toFixed(2)}`;
};
</script>

<style scoped>
.book-details-card {
  max-width: 700px;
  width: 100%;
  background-color: #ffffff;
}

.book-cover {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  margin: auto;
}
</style>
