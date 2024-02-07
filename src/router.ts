import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import PagoPropinas from '@/views/PagoPropinas.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'PagoPropinas',
    component: PagoPropinas
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
