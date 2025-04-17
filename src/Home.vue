<template>
  <div>
    <Header />

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
