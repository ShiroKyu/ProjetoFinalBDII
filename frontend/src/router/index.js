import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Perfil from '@/components/Perfil.vue';
import NotFound from '@/components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
