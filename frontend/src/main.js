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
      key: 'AIzaSyBKLILjbLg26NUDEbmLdohzaFZY3Qu9tbg'
    }
  });

console.log('gmaps api: ' + process.env.VUE_APP_GOOGLEMAPS_API_KEY);
console.log('backend api: ' + process.env.VUE_APP_API_URL);

app.mount("#app");
