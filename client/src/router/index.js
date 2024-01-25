import { createRouter, createWebHistory } from 'vue-router';
import CocktailPage from '../components/CokteilPage.vue';
import NotFound from '../components/Page404.vue';

const routes = [

  {
    path: '/:cocktailName',
    name: 'CocktailPage',
    component: CocktailPage,
  },
  {
    path: '/',
    redirect: '/Margarita',
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
