import { createWebHistory, createRouter } from 'vue-router';
// import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Perfil from '@/components/Perfil.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
