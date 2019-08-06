import React,{Component} from 'react';
import {Modal,Spin,Tree,message} from 'antd';
import {connect} from 'dva';
import styles from '../style.less';
const {TreeNode} = Tree;
const format = data => {
  return data.map(item =>{
    const result = {
      ...item,
      key:item.id,
      value:item.id
    }

    if(item.children){
      result.children = format(item.children);
    }
    return result;
  })
}
@connect(({loading,access,role})=>({
  access:access.list,
  role:role.access,
  loading:loading.effects['access/fetch']
}))
class RoleAccess extends Component{
  constructor(props) {
    super(props);
    this.state={
      keys:props.role.data.map(item => item.id + '')
    }
  }

  componentDidMount(){
    const {dispatch,role} = this.props;
    dispatch({
      type:'access/fetch'
    })
  }
  renderAccess = data => {
    return data.map(item => {
      if(item.children){
        return (
          <TreeNode title={item.title + item.name} key={item.key}>
            {this.renderAccess(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />
    })
  }
  handlCheck = keys =>{
    this.setState({keys})
  }
  handleCancel = ()=>{
    const {onChange} = this.props;
    this.setState({
      keys:[]
    })
    if(onChange) onChange(false);
  }
  handleSubmit = () => {
    const {dispatch,role,onChange}= this.props;
    const {keys} = this.state;
    if(keys.length == 0){
      message.error('请选择权限');
      return false;
    }
    dispatch({
      type:'role/fetchSaveAccess',
      payload:{id:role.id,data:keys},
      callback:()=>{
        onChange(false);
      }
    })
  }
  render(){
    const {
      visible,
      loading,
      access,
    } = this.props;
    const {keys} = this.state;
    return(
      <Modal
        title="分配权限"
        visible={visible}
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
      >
        {loading ? <Spin /> : (
          <div className={styles.RoleAccess}>
            <Tree
              checkable
              autoExpandParent={true}
              checkedKeys={keys}
              className={styles.RoleAccess}
              defaultExpandAll={true}
              onCheck={this.handlCheck}
            >
              {this.renderAccess(format(access))}
            </Tree>
          </div>
        )}
      </Modal>
    )
  }
}
export default RoleAccess;