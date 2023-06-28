import { RouteRecordRaw } from 'vue-router';
import { routes as authRoutes } from '../auth';
import { routes as mainRoutes } from '../app';

const routes: RouteRecordRaw[] = [
  {
    path: '',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/app' },
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: { requireLogin: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default [...routes, ...authRoutes, ...mainRoutes];
