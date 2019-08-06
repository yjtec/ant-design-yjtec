import fetch from 'dva/fetch';
// let routes = [];

let authRoutes = {};

function ergodicRoutes(routes, authKey, authority) {
  routes.forEach(element => {
    if(element.path === authKey){
      //if(!element.authority) element.authority= [];
      //Object.assign(element.authority,authority || []);
      Object.assign(element,{...authRoutes[authKey]});
    }else if(element.routes){
      ergodicRoutes(element.routes,authKey,authority);
    }

    return element;
  });
}

// // export function patchRoutes(routes){
// //   Object.keys(authRoutes).map(authKey => {
// //     ergodicRoutes(routes,authKey,authRoutes[authKey].authority)
// //   })

// //   console.log(routes);
// // }
export function patchRoutes(routes){
  Object.keys(authRoutes).map(authKey => {
    ergodicRoutes(routes,authKey,authRoutes[authKey].authority)
  })

  window.g_routes = routes;
}

export function render(oldRender){
  fetch('/api/routes')
    .then(res => res.json())
    .then(
      ret => {
        ret.data.map(item => {
          Object.assign(authRoutes,{[item.path]:item})
          //authRoutes.assign(item.path,item)
        })
        //authRoutes = ret;
        oldRender()
      },
      () => {
        oldRender();
      }
    )
}


// export function render(oldRender){
//   fetch('/api/routes')
//   .then(res => res.json())
//   .then(ret => {
//     console.log(ret);
//     oldRender();
//   },()=>{
//     oldRender();
//   })
// }
// export function patchRoutes(routes){
//   routes[1].routes.push({
//     path:'/foo',
//     name:'foo',
//     icon:'123',
//     component:'./foo'
//   })
//   window.g_routes = routes;
// }