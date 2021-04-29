import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Perfil from '@/components/Perfil.vue';
import NotFound from '@/components/NotFound.vue';
import CreatePost from '@/components/CreatePost.vue';
import Search from '@/components/Search.vue';

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
    path: '/createpost',
    name: 'CreatePost',
    component: CreatePost,
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
    path: '/search',
    name: 'Search',
    component: Search,
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
