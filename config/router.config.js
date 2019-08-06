export default [{
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [{
      path: '/user/login',
      component: './user/Login',
    }, ],
  }, // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {path:'/',redirect:'/welcome'},
      {
        path:'/welcome',
        component: './Welcome',
        name:'工作台',
        icon:'box-plot'
      }, 
      {path:'/foo',component:'./foo'},
      {path:'/admin',component:'./Admin',routes:[{
        path:'/admin/user',component:'./Admin/User'
      }]},
      {path:'/rbac',component:'./Rbac',routes:[
        {path:'/rbac/role',component:'./Rbac/Role'},
        {path:'/rbac/access',component:'./Rbac/Access'},
        {path:'/rbac/menu',component:'./Rbac/Menu'},
      ]}
    ],
  },
];

/*

{
      path: '/admin',
      component: './Admin',
      icon: 'user',
      name: 'admin',
      routes: [{
        name: 'user',
        icon: 'users',
        path: '/admin/user',
        component: './Admin/User',
      }, ],
    }, {
      path: '/rbac',
      name: 'rbac',
      icon: 'form',
      component: './Rbac',
      routes: [{
        path: '/rbac',
        'redirect': '/rbac/role'
      }, {
        name: 'role',
        path: '/rbac/role',
        component: './Rbac/Role'
      }, {
        name: 'access',
        path: '/rbac/access',
        component: './Rbac/Access'
      }, {
        name: 'menu',
        path: '/rbac/menu',
        component: './Rbac/Menu'
      }]
    }, 
    {
      component: '404',
    }, 
 */