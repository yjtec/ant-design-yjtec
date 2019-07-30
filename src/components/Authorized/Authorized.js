import React from 'react';
import check from './CheckPermissions';
const Authorized = ({children,authority,noMatch=null}) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  const dom = check(authority, childrenRender, noMatch);
    return <React.Fragment>{dom}</React.Fragment>;
}

export default Authorized;