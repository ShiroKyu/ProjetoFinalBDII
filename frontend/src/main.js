import { createApp } from 'vue';

import router from '@/router/index';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import store from './states';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(Toast);
app.use(store);
app.mount('#app');
