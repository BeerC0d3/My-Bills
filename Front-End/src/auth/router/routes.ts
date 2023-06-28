export default [
  {
    path: '/auth',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        name: 'Page Login',
        path: 'login',
        component: () => import('../pages/Login.vue'),
      },
      {
        path: 'activation',
        component: () => import('../layouts/MainLayout.vue'),
        children: [
          { path: '', component: () => import('../pages/Activation.vue') },
        ],
      },
    ],
  },
];
