import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import VueAxios from "vue-axios";
import axios from "axios";
import maska from "maska";
import VueClickAway from "vue3-click-away";
import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyBZl5vAYL8Qz29aIx1L9ecyAhQpPNs5rk0",
    authDomain: "landberry-ad00b.firebaseapp.com",
    projectId: "landberry-ad00b",
    storageBucket: "landberry-ad00b.appspot.com",
    messagingSenderId: "646073625274",
    appId: "1:646073625274:web:a9fed02a10b78f728e3083",
    measurementId: "G-6XMWKZNSSJ"
};

firebase.initializeApp(firebaseConfig)
// Initialize Firebase
// firebase.initializeApp(firebaseConfig)


// eslint-disable-next-line no-unused-vars





createApp(App).use(store).use(router).use(VueAxios, axios).use(maska).use(VueClickAway).mount("#app");
