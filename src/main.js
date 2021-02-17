import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Routes from "./routes";
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAeo9aBOIGK3w5jJ1H8Lyuku2bdvKU-4uo",
  authDomain: "todolist-29eb7.firebaseapp.com",
  projectId: "todolist-29eb7",
  storageBucket: "todolist-29eb7.appspot.com",
  messagingSenderId: "165903273782",
  appId: "1:165903273782:web:4d6606cedb20a4dfd22d97",
  measurementId: "G-M7FNTLQBDT",
};
Vue.use(VueRouter);
const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

firebase.initializeApp(firebaseConfig);

new Vue({
  el: "#app",
  render: (h) => h(App),
  router: router,
});
