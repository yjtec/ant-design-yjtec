export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user/login',
        component: './user/Login',
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
        name:"home",
        icon:'home',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smail',
        component: './Welcome',
        authority: ['admin', 'user'],
        routes:[
          {
            name:'one',
            icon: 'smail',
            path:'/welcome/one',
            component:'./Welcome'
          }
        ]
      },
      {
        component:'404'
      }
    ],
  },

];
