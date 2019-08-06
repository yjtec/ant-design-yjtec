import { query,fetchSave,fetchDelete,fetchPut,fetchOne,fetchMul,fetchRole} from './service';
import {message} from 'antd';
const format = data => {
  return data.map(item => {
    const result = {
      title:item.title,
      value:item.id
    }
    if(item.children){
      const children = format(item.children);
      result.children = children;
    }
    return result;
  })
}
export default { 
  namespace:'admin',
  state:{
    data:[],
    pagination:{page:1,pageSize:10,total:0},
    one:[],
    role:[],
    handleItem:{
      disable:{label:'禁用',value:'-1'},
      enable:{label:'启用',value:'1'}
    }
  },
  effects: {
    *fetch({payload}, { call, put,select }) {
      const {pagination} = yield select(state => state.admin);
      const re = yield call(query,{...pagination,...payload});
      yield put({
        type:'saveFetch',
        payload:re
      })
    },
    *fetchRole({payload},{call,put,select}){
      const re = yield call(fetchRole);

      yield put({
        type:'saveRole',
        payload:format(re)
      })
    },
    *fetchSave({payload,callback},{call,put,select}){
      const re = yield call(fetchSave,payload);
      if(re){
        if(callback) callback();
        yield put({
          type:'fetch'
        })
      }
      
    },
    *fetchOne({payload},{call,put}){
      const re = yield call(fetchOne,payload);
      yield put({
        type:'saveOne',
        payload:re
      })
    },
    *fetchDelete({payload},{call,put,select}){
      const re = yield call(fetchDelete,payload);
      yield put({
        type:'fetch'
      })
    },
    *fetchPut({payload},{call,put,select}){
      const re = yield call(fetchPut,payload.id,payload.data);
      if(re){
        yield put({
          type:'fetch'
        })
      }
    },
    *fetchMul({payload,callback},{call,put,select}){
      const re = yield call(fetchMul,payload);
      if(re){
        callback();
        yield put({
          type:'fetch'
        })
      }
    }
  },

  reducers: {
    saveFetch(state, {payload}) {
      return {
        ...state,
        data: payload.data,
        pagination:{
          page:Number(payload.current_page),
          total:Number(payload.total),
          pageSize:Number(payload.per_page)
        }
      };
    },
    saveRole(state,{payload}){
      return {
        ...state,
        role:payload
      }
    },
    saveOne(state,{payload}){
      const one = payload;
      return {...state,one}
    }
  }
}