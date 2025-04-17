import { createRouter, createWebHistory } from "vue-router";

// 1- import the components
import Main from "../components/Main.vue";
import BookDetails from "../components/BookDetails.vue";
import Wishlist from "../components/Wishlist.vue";
import Cart from "../components/Cart.vue";
import Checkout from "@/components/Checkout.vue";
import NotFound from "../components/NotFound.vue";

// 2- create the routes
const routes = [
  { path: "/", component: Main, name: "Home" },
  {
    path: "/bookDetails/:id",
    component: BookDetails,
    props: true,
    name: "BookDetails",
  },
  { path: "/wishlist", component: Wishlist, name: "Wishlist" },
  { path: "/cart", component: Cart, name: "Cart" },
  { path: "/checkout", component: Checkout, name: "Checkout" },
  { path: "/:pathMatch(.*)*", component: NotFound, name: "NotFound" },
];

// 3- create the router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 4- export the router
export default router;
