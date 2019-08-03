import ProLayout,{PageHeaderWrapper} from '@yjtec/pro-layout';
import styles from './BasicLayout.less';
import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import RightContent from '@/components/GlobalHeader/RightContent';
import {connect} from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
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
          className={styles.layout}
          {...this.props}
          logo={logo}
          formatMessage={formatMessage}
          rightContentRender = {(rightProps) => <RightContent {...rightProps} />}
        >
          {/*<PageHeaderWrapper>{children}</PageHeaderWrapper>*/}
          {children}
        </ProLayout>
      </React.Fragment>
    )
  }
}
export default BasicLayout;