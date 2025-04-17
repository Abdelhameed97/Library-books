<template>
  <main class="container my-4">
    <div class="row">
      <div
        class="col-md-4 mb-4 book-card shadow-sm"
        v-for="book in books"
        :key="book.id"
      >
        <div class="card h-100">
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
              <div><strong>Pages:</strong> {{ book.pages }}</div>
              <div><strong>ISBN:</strong> {{ book.ISBN }}</div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span
                :class="[
                  book.instock >= 5 ? 'more fs-4' : '',
                  book.instock < 5 ? 'less fs-4' : '',
                  book.instock == 0 ? 'none fs-4' : '',
                ]"
              >
                InStock: {{ book.instock }}
              </span>
              <span class="fw-bold text-primary fs-4">{{
                currencyFormatter(book.price)
              }}</span>
            </div>

            <!-- Divider -->
            <hr class="my-2" />

            <!-- Icon Buttons Section -->
            <div class="d-flex justify-content-between">
              <button
                class="btn btn-outline-danger border-0 w-100 me-2"
                @click="addToWishlist(book)"
                :disabled="isInWishlist(book.id)"
              >
                <i class="fas fa-heart fs-4"></i>
              </button>
              <button
                class="btn btn-outline-primary border-0 w-100"
                :disabled="book.instock == 0"
                @click="addBookToCart(book)"
              >
                <i class="fas fa-cart-plus me-2 fs-4"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// import useCounterStore from "./Stores/counterStores.js";
// const store1 = useCounterStore();
import { ref, onMounted } from "vue";
import { useBookStore } from "./Stores/bookStore.js";

const books = ref([]);
const wishlist = ref([]);
const cart = ref([]);
const store = useBookStore();

onMounted(async () => {
  const res = await fetch("http://localhost:5000/books");
  books.value = await res.json();
});

function currencyFormatter(price) {
  return `$${price.toFixed(2)}`;
}

function stockClass(stock) {
  if (stock === 0) return "text-danger";
  if (stock < 5) return "text-warning";
  return "text-success";
}

function isInWishlist(bookId) {
  return wishlist.value.includes(bookId);
}

function addToWishlist(book) {
  store.addToWishlist(book);
}

function addBookToCart(book) {
  store.addBookToCart(book);
}
</script>

<style scoped>
.more {
  color: green;
}
.less {
  color: orange;
}
.none {
  color: red;
}
.book-img {
  height: 250px;
  object-fit: cover;
}
.book-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.book-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 123, 255, 0.3);
}

.book-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.book-link:hover .book-img {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.hover-icon:hover {
  transform: scale(1.3);
}
</style>
