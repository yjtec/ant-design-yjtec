import ProLayout,{PageHeaderWrapper} from '@yjtec/pro-layout';
import styles from './BasicLayout.less';
import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import {connect} from 'dva';
@connect((loading)=>({

}))
class BasicLayout extends Component{
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type:"user/fetchCurrent"
    })
  }
  render(){
    const {children} =this.props;
    return (
      <React.Fragment>
        <ProLayout
          {...this.props}
          logo={logo}
          rightContentRender = {(rightProps) => <div>right content</div>}
        >
          <PageHeaderWrapper>{children}</PageHeaderWrapper>
        </ProLayout>
      </React.Fragment>
    )
  }
}
export default BasicLayout;