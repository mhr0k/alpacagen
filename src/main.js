import "./assets/css/pico/css/pico.amber.min.css";

import { createApp } from "vue";
import App from "./App.vue";

document.querySelector("body").classList.add("container");

createApp(App).mount("body");
