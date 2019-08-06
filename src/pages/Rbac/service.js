import request from 'yjtec-request';
import {
  stringify,
  parse
} from 'qs';
export async function role($params) {
  return request(`/api/role?type=nested`);
}

export async function roleSave(data){
  return request(`/api/role`, {
    method: 'post',
    data: data,
    requestType: 'form',
  })  
}
export async function roleDelete(id) {
  return request(`/api/role/${id}`,{
    method:'delete'
  });
}

export async function roleOne(id){
  return request(`/api/role/${id}`);
}
export async function rolePut(id,data){
  return request(`/api/role/${id}`,{
    method:'put',
    data:data,
    requestType:'form'
  })
}

export async function roleAccess(id){
  return request(`/api/role/access/${id}`);
}

export async function roleSaveAccess(id,data){
  return request(`/api/role/${id}/access?${stringify({access:data},{arrayFormat:'indices'})}`,{
    method:'put',
    alert:0
  })
}



export async function access($params){
  return request(`/api/access?type=nested`);
}
export async function accessDelete(id) {
  return request(`/api/access/${id}`,{
    method:'delete'
  });
}
export async function accessOne(id){
  return request(`/api/access/${id}`);
}
export async function accessPut(id,data){
  return request(`/api/access/${id}`,{
    method:'put',
    data:data,
    requestType:'form'
  })
}
export async function accessSave(data){
  return request(`/api/access`,{
    method:'post',
    data:data,
    requestType: 'form',
  })
}

export async function menu($params){
  return request(`/api/menu?type=nested`);
}

export async function menuSave(data){
  let params = '';
  if(data.roles){
    params = stringify({roles:data.roles},{arrayFormat:'brackets'});
    delete data.roles;
  }

  return request(`/api/menu?${params}`,{
    method:'post',
    data:data,
    requestType: 'form',
  })  
}
export async function menuOne(id){
  return request(`/api/menu/${id}`);
}
export async function menuMulDelete(ids){
  return request(`/api/menu?${stringify({ids:ids},{arrayFormat:'indices'})}`,{
    method:'delete',
    alert:0
  })
}

export async function menuPut(id,data){
  let params = '';
  if(data.roles){
    params = stringify({roles:data.roles},{arrayFormat:'brackets'});
    delete data.roles;
  }  
  return request(`/api/menu/${id}?${params}`,{
    method:'put',
    data:data,
    requestType:'form'
  })
}
