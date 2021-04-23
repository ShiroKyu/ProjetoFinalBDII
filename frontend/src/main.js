import { createApp } from 'vue';
// import VueToastify from 'vue-toastify';

import router from '@/router/index';
import App from './App.vue';

const app = createApp(App);
app.use(router);
// app.use(VueToastify);
app.mount('#app');
