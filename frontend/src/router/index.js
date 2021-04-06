import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
