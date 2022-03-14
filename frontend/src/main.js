const { createApp } = require("vue");
import axios from 'axios';
import App from "./App.vue";
import VueGoogleMaps from "@fawmi/vue-google-maps";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;  // the FastAPI backend

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // store.dispatch('logOut');
      return  // router.push('/login')
    }
  }
});


const app = createApp(App);
app.config.productionTip = false;

app.use(VueGoogleMaps, {
    load: {
      key: process.env.VUE_APP_GOOGLEMAPS_API_KEY
    }
  });

app.mount("#app");
