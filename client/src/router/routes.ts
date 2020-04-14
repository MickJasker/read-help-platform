import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/reader',
    name: 'Reader',
    component: () => import(/* webpackChunkName: "about" */ '../views/Reader.vue'),
  },
  {
    path: '/forward',
    name: 'Forward',
    component: () => import(/* webpackChunkName: "about" */ '../views/Forward.vue'),
  },
];

export default routes;
