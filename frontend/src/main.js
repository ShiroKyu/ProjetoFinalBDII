import { createApp } from 'vue';

import router from '@/router/index';
import Toast from 'vue-toastification';
import App from './App.vue';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

const app = createApp(App);
app.use(router);
app.use(Toast);

app.mount('#app');
