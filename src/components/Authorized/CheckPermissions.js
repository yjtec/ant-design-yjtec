import React from 'react';
import { CURRENT } from './renderAuthorize';

const checkPermissions = (authority, currentAuthority, target, Exception) => {
  if (!authority) {
    return target;
  }
  //console.log(currentAuthority,currentAuthority);
  if(Array.isArray(authority)){
    if(Array.isArray(currentAuthority)){
      if(currentAuthority.some(item => authority.includes(item))){
        return target;
      }
    }else if(authority.includes(currentAuthority)){
      return target;
    }
    return Exception;
  }
  if(typeof authority === 'string'){
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(item => authority === item)) {
        return target;
      }
    }else if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }
  throw new Error('unsupported parameters');
}
export { checkPermissions };
function check(authority, target, Exception) {
  return checkPermissions(authority, CURRENT, target, Exception);
}
export default check;