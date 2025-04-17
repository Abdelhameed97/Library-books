<template>
  <div class="container">
    <h1 class="text-center mt-5">Checkout</h1>
    <div class="row mt-4">
      <div class="col-md-6 mx-auto">
        <form class="border p-4 rounded shadow-sm">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" required />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-control" id="address" required />
          </div>
          <button type="submit" class="btn btn-success w-100">
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookStore } from "./Stores/bookStore.js";
const store = useBookStore();
import { useRouter } from "vue-router";
const router = useRouter();

function completePurchase() {
  // Logic to handle the purchase completion
  alert("Purchase completed successfully!");
  store.clearCart(); // Clear the cart after purchase
  router.push("/"); // Redirect to home page
}

function currencyFormatter(price) {
  return `$${price.toFixed(2)}`;
}

function totalPrice() {
  return store.cart.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );
}

function totalTax() {
  return totalPrice() * 0.1; // Assuming a 10% tax rate
}

function grandTotal() {
  return totalPrice() + totalTax();
}
</script>

<style scoped></style>
