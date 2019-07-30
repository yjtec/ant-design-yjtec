import React from 'react';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import Link from 'umi/link';
import logo from '../assets/logo.svg';
export default class UserLayout extends React.Component{
  
  render(){
    const {
      children
    } = this.props;
    return(
      <DocumentTitle title="123">
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Yjtec MS</span>
                </Link>
              </div>
              <div className={styles.desc}>Yjtec MS 是由全景智慧城市出品的管理系统</div>
            </div>
            {children}
          </div>
        </div>
      </DocumentTitle>
    )
  }
}