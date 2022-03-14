const { createApp } = require("vue");
// import axios from 'axios';
import App from "./App.vue";
import VueGoogleMaps from "@fawmi/vue-google-maps";

// axios.defaults.withCredentials = false;
// axios.defaults.baseURL = `${window._env_.API_URL}/`

// axios.interceptors.request.use(function(config) {
//   config.url = config.url.replace('http://', 'https://')
//   return config
// });

// axios.interceptors.response.use(undefined, function (error) {
//   if (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       // store.dispatch('logOut');
//       return  // router.push('/login')
//     }
//   }
// });


const app = createApp(App);
app.config.productionTip = false;

app.use(VueGoogleMaps, {
    load: {
      key: `${window._env_.GOOGLEMAPS_API_KEY}`
    }
  });

console.log(`gmaps api: ${window._env_.GOOGLEMAPS_API_KEY}`);
console.log(`backend api: ${window._env_.API_URL}`);

app.mount("#app");
