import React, { Component } from 'react';
import User from './User';
import { PageHeaderWrapper } from '@yjtec/pro-layout';
export default class AdminContainer extends Component {
  render() {
    return (
      <PageHeaderWrapper>
        <User />
      </PageHeaderWrapper>
    );
  }
}
