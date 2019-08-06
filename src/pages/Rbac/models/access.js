import { access,accessSave,accessDelete,accessOne,accessPut} from '../service';

export default { 
  namespace:'access',
  state:{
    list:[],
    one:{}
  },
  effects: {
    *fetch({payload}, { call, put,select }) {
      const re = yield call(access);
      yield put({
        type:'saveFetch',
        payload:re
      })
    },
    *fetchSave({payload,callback},{call,put,select}){
      const re = yield call(accessSave,payload);
      if(re){
        if(callback) callback();
        yield put({
          type:'fetch'
        })
      }
    },
    *fetchOne({payload},{call,put,select}){
      const re = yield call(accessOne,payload);
      yield put({
        type:'saveOne',
        payload:re
      })
    },
    *fetchDelete({payload},{call,put,select}){
      const re = yield call(accessDelete,payload);
      if(re){
        yield put({
          type:'fetch'
        })
      }
    },
    *fetchPut({payload},{call,put,select}){
      const re = yield call(accessPut,payload.id,payload.data);
      if(re){
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
        list:payload
      }
    },
    saveOne(state,{payload}){
      return {
        ...state,
        one:payload
      }
    }
  }
}