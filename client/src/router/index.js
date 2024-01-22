import { createRouter, createWebHistory } from 'vue-router'
import Margarita from '../components/Margarita.vue'
import Mojito from '../components/Mojito.vue'
import A1 from '../components/A1.vue'
import Kir from '../components/Kir.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Margarita',
      name: 'Margarita',
      component: Margarita
    },
    {
      path: '/Mojito',
      name: 'Mojito',
      component: Mojito
    },
    {
      path: '/A1',
      name: 'A1',
      component: A1
    },
    {
      path: '/Kir',
      name: 'Kir',
      component: Kir
    }
  ]
})

export default router
