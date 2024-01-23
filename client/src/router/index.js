import { createRouter, createWebHistory } from 'vue-router';
import Margarita from '../components/Margarita.vue';
import Mojito from '../components/Mojito.vue';
import A1 from '../components/A1.vue';
import Kir from '../components/Kir.vue';
import NotFound from '../components/Page404.vue';

const routes = [
  {
    path: '/',
    redirect: '/Margarita',
  },
  {
    path: '/Margarita',
    name: 'Margarita',
    component: Margarita,
  },
  {
    path: '/Mojito',
    name: 'Mojito',
    component: Mojito,
  },
  {
    path: '/A1',
    name: 'A1',
    component: A1,
  },
  {
    path: '/Kir',
    name: 'Kir',
    component: Kir,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
