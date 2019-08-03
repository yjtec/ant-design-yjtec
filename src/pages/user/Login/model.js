import { fetchLogin, getCaptcha } from './service';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { reloadAuthorized } from '@/utils/Authorized';
export default {
  namespace: 'login',

  state: {
    status: undefined,
  },
  effects:{
    *login({payload},{call,put}){
      const re = yield call(fetchLogin,payload);
      yield put({
        type:'changeLoginStatus',
        payload:{
          ...re.data,
          status:re.errcode == 0 ? 'ok' :'error',
        }
      })

      if(re.errcode == 0 ){
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;
        if(redirect){
          const redirectUrlParams = new URL(redirect);
          if(redirectUrlParams.origin === urlParams.origin){
            //console.log(urlParams.origin.length);
            redirect=redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          }else{
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    *getCaptcha({payload},{call,put}){
      yield call(getCaptcha,payload);
    },
    *logout(_,{call,put}){
      yield put({
        type:'changeLoginStatus',
        payload:{
          status:false,
          currentAuthority:'guest'
        }
      })
      
      yield put(routerRedux.replace({
        pathname:'/user/login',
        search:stringify({
          redirect:window.location.href
        })
      }))

    }
  },
  reducers:{
    changeLoginStatus(state,{payload}){
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status:payload.status,
        type:payload.type
      }
    }
  }

}