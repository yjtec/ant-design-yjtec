import ProLayout,{PageHeaderWrapper} from '@yjtec/pro-layout';
import styles from './BasicLayout.less';
import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import RightContent from '@/components/GlobalHeader/RightContent';
import {connect} from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import fetch from 'dva/fetch';
const format = (data) =>
  data.map(item => {

    const result = {
      ...item,
      name:item.title
    }

    if(item.routes){
      result.children = format(item.routes);
    }

    return result;
  })
@connect((loading)=>({

}))
class BasicLayout extends Component{
  state ={ 
    routeData:[]
  }
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type:"user/fetchCurrent"
    })
  }
  render(){
    const {children,route} =this.props;
    const {routeData} = this.state;
    console.log(route);
    return (
      <React.Fragment>
        <ProLayout
          className={styles.layout}
          {...this.props}
          locale={false}
          logo={logo}
          //menuDataRender={()=>format(routeData)}
          //formatMessage={formatMessage}
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