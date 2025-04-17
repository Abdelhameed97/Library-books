import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./routes/index";
import Home from "./Home.vue";
const pinia = createPinia();
createApp(Home).use(router).use(pinia).mount("#app");

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
