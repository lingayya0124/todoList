import { createApp, Vue } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
/*we need to use environment key*/

var firebaseConfig = {
  apiKey: "AIzaSyAeo9aBOIGK3w5jJ1H8Lyuku2bdvKU-4uo",
  authDomain: "todolist-29eb7.firebaseapp.com",
  projectId: "todolist-29eb7",
  storageBucket: "todolist-29eb7.appspot.com",
  messagingSenderId: "165903273782",
  appId: "1:165903273782:web:4d6606cedb20a4dfd22d97",
  measurementId: "G-M7FNTLQBDT",
};

firebase.initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .mount("#app");
