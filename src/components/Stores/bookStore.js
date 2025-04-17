// Stores/bookStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useBookStore = defineStore("bookStore", () => {
  const wishlist = ref([]);
  const cart = ref([]);

  // 🛒 Cart Functions
  const addBookToCart = (book) => {
    const existingItem = cart.value.find((item) => item.book.id === book.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.value.push({ book, quantity: 1 });
    }
    book.instock--;
  };

  const removeFromCart = (item) => {
    item.book.instock += item.quantity;
    cart.value = cart.value.filter(
      (cartItem) => cartItem.book.id !== item.book.id
    );
  };

  const increaseQuantity = (item) => {
    item.quantity++;
    item.book.instock--;
  };

  const decreaseQuantity = (item) => {
    item.quantity--;
    item.book.instock++;
    if (item.quantity === 0) {
      removeFromCart(item);
    }
  };

  const clearCart = () => {
    cart.value.forEach((item) => {
      item.book.instock += item.quantity;
    });
    cart.value = [];
  };

  // 💖 Wishlist Functions
  const addToWishlist = (book) => {
    if (!wishlist.value.some((item) => item.id === book.id)) {
      wishlist.value.push(book);
    }
  };

  const removeFromWishlist = (bookId) => {
    wishlist.value = wishlist.value.filter((item) => item.id !== bookId);
  };

  const isInWishlist = (bookId) => {
    return wishlist.value.some((item) => item.id === bookId);
  };

  return {
    wishlist,
    cart,
    addBookToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
});
