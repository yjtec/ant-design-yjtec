import { role,roleSave,roleDelete,roleOne,rolePut,roleAccess,roleSaveAccess} from '../service';
const format = data => {
  return data.map(item =>{
    const result = {
      ...item,
      key:item.id,
      value:item.id
    }

    if(item.children){
      result.children = format(item.children);
    }
    return result;

  })
}
export default { 
  namespace:'role',
  state:{
    list:[],
    one:{},
    access:[]
  },
  effects: {
    *fetch({payload}, { call, put,select }) {
      const re = yield call(role);
      yield put({
        type:'saveFetch',
        payload:format(re)
      })
    },
    *fetchSave({payload,callback},{call,put,select}){
      const re = yield call(roleSave,payload);
      if(re){
        if(callback) callback();
        yield put({
          type:'fetch'
        })

      }
    },
    *fetchDelete({payload},{call,put,select}){
      const re = yield call(roleDelete,payload);
      yield put({
        type:'fetch'
      })
    },
    *fetchOne({payload},{call,put,select}){
      const re = yield call(roleOne,payload);
      yield put({
        type:'saveOne',
        payload:re
      })
    },
    *fetchPut({payload,callback},{call,put}){
      const re = yield call(rolePut,payload.id,payload.data);
      if(re){
        yield put({
          type:'fetch'
        })
        if(callback) callback();
      }
    },
    *fetchAccess({payload,callback},{call,put,select}){
      const re = yield call(roleAccess,payload);
      yield put({
        type:'saveAccess',
        payload:{id:payload,data:re}
      })
      if(callback) callback();
    },
    *fetchSaveAccess({payload,callback},{call,put,select}){
      const re = yield call(roleSaveAccess,payload.id,payload.data);
      if(re){
        if(callback) callback();
      }
    }
  },
  reducers: {
    saveFetch(state, {payload}) {
      return {
        ...state,
        list:payload
      }
    },
    saveOne(state,{payload}){
      return {
        ...state,
        one:payload
      }
    },
    saveAccess(state,{payload}){
      return {...state,access:payload}
    }
  }
}