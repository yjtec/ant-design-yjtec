import React,{Component} from 'react';
import styles from './index.less';
import Avatar from './AvatarDropdown';
class GlobalHeaderRight extends Component{
  
  render(){
    const {
      theme,
      layout
    } = this.props;
    let className = styles.right;
    if (theme === 'dark' && layout === 'topmenu') {
        className = `${styles.right}  ${styles.dark}`;
    }
    return(
      <div className={className}>
        <Avatar menu />
      </div>
    )
  }
}

export default GlobalHeaderRight;