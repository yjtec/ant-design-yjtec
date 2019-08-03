import React,{Component} from 'react';
import {FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import {connect} from 'dva';
import router from 'umi/router';
import {Avatar,Menu,Spin,Icon} from 'antd';
import HeaderDropdown from '../HeaderDropdown';
@connect(({user})=>({
  currentUser:user.currentUser
}))
class AvatarDropdown extends Component{
  state ={}
  onMenuClick = event => {
    const {key} = event;
    if(key === 'logout'){
      const {dispatch} = this.props;
      dispatch({
        type:'login/logout'
      })
      return;
    }
    router.push(`/account/${key}`);
  }
  render(){
    const {
      currentUser={},
      menu
    } = this.props;
    if(!menu){
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        </span>
      )
    }

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="center">
          <Icon type="user"/>
          <FormattedMessage id="menu.account.center" defaultMessage="account center"/>
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout"/>
          <FormattedMessage id="menu.account.logout" defaultMessage="logout"/>
        </Menu.Item>
      </Menu>
    )
    return currentUser && currentUser.name ? (
        <HeaderDropdown overlay={menuHeaderDropdown}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar"/>
            <span className={styles.name}>{currentUser.name}</span>
          </span>
        </HeaderDropdown>
      ) :(
      <Spin size="small" style={{marginLeft:8,marginRight:8}} />
    )
  }
}

export default AvatarDropdown;