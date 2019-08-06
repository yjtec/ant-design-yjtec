import request from 'yjtec-request';
import {
  stringify
} from 'qs';
function formatRoles(data){
  return stringify({roles:data},{arrayFormat:'indices'});
}
export async function query($params) {
  return request(`/api/user?${stringify($params,{arrayFormat:'indices'})}`);
}
export async function fetchSave(params) {
  const roles = stringify({roles:params.roles},{arrayFormat:'indices'});
  delete params.roles;
  return request(`/api/user?${roles}`, {
    method: 'post',
    data: params,
    requestType: 'form',
  })
}

export async function fetchDelete(id){
  return request(`/api/user/${id}`,{
    method:'delete'
  });
}

export async function fetchOne(id){
  return request(`/api/user/${id}`);
}

export async function fetchPut(id,data){
  const roles = formatRoles(data.roles);
  delete data.roles;
  return request(`/api/user/${id}?${roles}`,{
    method:'put',
    data:data,
    requestType: 'form',
  })
}

export async function fetchMul(data){
  //console.log(stringify(data));
  return request(`/api/user/mul`,{
    method:'post',
    data:data,
    alert:0,
    requestType:'form'
  })
}

export async function fetchRole(){
  return request('/api/role?type=nested');
}