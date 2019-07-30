import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/utils/Authorized';
const getRouteAuthority = (path,routeData) => {
  let authorities;
  routeData.forEach(route => {
    if(pathToRegexp(`${route.path}(.*)`).test(path)){
      authorities = route.authority || authorities;
      if(route.routes){
        authorities = getRouteAuthority(path,route.routes) || authorities;
      }
    }
  })

  return authorities;
}
@connect(({user})=>({
  user
}))
class AuthComponent extends React.Component{
  render(){
    const {
      children,
      route={routes:[]},
      location={pathname:''},
      user
    } = this.props;
    const {currentUser} = user;
    const {routes=[]} = route;
    //const isLogin = currentUser && currentUser.name;
    const isLogin = true;
    return(
      <Authorized authority={getRouteAuthority(location.pathname, routes) || ''} noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user/login" />}>{children}</Authorized>
    )
  }
}
export default AuthComponent;
// export default ({children,location})=>{
//   const auth = ['admin'];
//   const isLogin = auth && auth[0] !== 'guest';
//   return <div>{children}</div>
// }