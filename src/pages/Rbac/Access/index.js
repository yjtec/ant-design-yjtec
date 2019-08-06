import React,{Component} from 'react';
import styles from '../style.less';
import {Button,Collapse,Menu,Dropdown,Icon} from 'antd';
import Add from './add';
import List from './list';
export default class Access extends Component{
  state = {
    visible:false,
    level:0
  }
  handleModel = (flag,level = 0,pid=0) => {
    this.setState({
      visible:flag,
      level:level,
      pid:pid
    })
  }
  handleEdit = () =>{

  }
  render(){
    const {visible,level,pid} = this.state;
    
    return(
      <div className={styles.AccessList}>
        <Button onClick={()=>this.handleModel(true)} type="primary">创建应用</Button>
        <Add 
          visible={visible} 
          level={level}
          pid={pid}
          onChange={this.handleModel}
        />
        <List 
          onChange={this.handleModel}
          onEdit ={this.handleEdit}
        />
      </div>
    )
  }
}