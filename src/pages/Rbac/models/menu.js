import { menu,menuSave,menuMulDelete,menuOne,menuPut} from '../service';
import {
  stringify
} from 'qs';
const format = data => {
  return data.map(item => {
    const result = {
      key:item.id,
      title:item.title,
      value:item.id
    };
    if(item.children){
      result.children = format(item.children)
    }
    return result;
  })
}
export default { 
  namespace:'menu',
  state:{
    list:[],
    one:{},
    tree:[]
  },
  effects: {
    *fetch({payload}, { call, put,select }) {
      const re = yield call(menu);
      if(re){
        yield put({
          type:'saveFetch',
          payload:{list:re,tree:format(re)}
        })
      }
      
    },
    *fetchSave({payload,callback},{call,put,select}){
      const re = yield call(menuSave,payload);
      if(re){
        if(callback) callback();
        yield put({
          type:'fetch'
        })
      }
    },
    *fetchOne({payload,callback},{call,put}){
      const re = yield call(menuOne,payload);
      if(re){
        yield put({
          type:'saveOne',
          payload:re
        })

        if(callback) callback();
      }
    },
    *fetchUpdate({payload,callback},{call,put,select}){
      const re = yield call(menuPut,payload.id,payload.data);
      if(re){
        yield put({
          type:'fetch'
        })

        if(callback) callback();
      }
    },
    *fetchMulDelete({payload,callback},{call,put,select}){
      const re = yield call(menuMulDelete,payload);
      if(re){
        yield put({
          type:'fetch'
        })
        if(callback) callback();
      }
    }
  },
  reducers: {
    saveFetch(state,{payload}){
      const {list,tree} = payload;
      tree.unshift({title:'顶级','key':'0',value:"0"});
      return {
        ...state,
        tree,
        list
      }
    },
    saveOne(state,{payload}){
      return {...state,one:payload}
    }
  }
}