export default [
  {
    path: '/app',
    component: () => import('../layouts/AppLayout.vue'),
    // meta: { requireLogin: true },
    children: [
      {
        path: '',
        component: () => import('../pages/Home.vue'),
        // meta: { requireLogin: true },
      },
      {
        path: 'QItems',
        component: () => import('../pages/Qitems.vue'),
        // meta: { requireLogin: true },
      },

      // {
      //   path: 'Medicos',
      //   // component: () => import('../pages/MedicoPage.vue'),
      //   // meta: { requireLogin: true },
      //   children: [
      //     { path: '', component: () => import('../pages/Medicos/Listado.vue') },

      //     {
      //       path: 'add-edit',
      //       component: () => import('../pages/Medicos/AddEdit.vue'),
      //       meta: { requireLogin: true },
      //     },
      //   ],
      // },
      // {
      //   path: 'Catalogos',
      //   component: () => import('../pages/CatalogoPage.vue'),
      //   meta: { requireLogin: false },
      //   children: [
      //     { path: '', component: () => import('../pages/Sistema/Listado.vue') },

      //   ],
      // },
      // {
      //   path: 'Pacientes',
      //   component: () => import('../pages/PacientePage.vue'),
      //   meta: { requireLogin: true },
      //   children: [
      //     // { path: '', component: () => import('../pages/Medicos/Listado.vue') },

      //     {
      //       path: 'autorizar-paciente',
      //       component: () => import('../pages/Pacientes/PacienteDetalle.vue'),
      //       meta: { requireLogin: true },
      //     },
      //   ],
      // },
      // {
      //   path: 'profile',
      //   component: () => import('../../auth/pages/Profile.vue'),
      //   meta: { requireLogin: true },
      // },
      // {
      //   path: 'Component',
      //   component: () => import('../pages/TestComponent.vue'),
      // },
      // {
      //   path: 'Camara',
      //   component: () => import('../pages/Camara.vue'),
      // },
    ],
  },
];
