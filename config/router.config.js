export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        component: './user',
      },
    ],
  }, // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        redirect: '/welcome/one',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smail',
        authority: ['admin', 'user', 'bbb'], // routes: [
        //   {
        //     path: '/welcome/one',
        //     name: 'analysis',
        //     icon: 'smail',
        //     component: './Welcome',
        //   },
        // ],
      },
    ],
  },
];
