import React,{Component} from 'react';
import {connect} from 'dva';
import {Tree,Icon,Card,Button,message} from 'antd';
const {TreeNode} = Tree;

@connect(({loading,menu})=>({
  loading:loading.effects['menu/fetchMulDelete'],
  menu:menu
}))
class ListPage extends Component{
  state ={
    ids:[]
  }
  handleDelete = () => {
    const {ids} = this.state;
    if(!ids.length){
      message.error('请选择要删除的菜单');
      return false;
    }

    const {dispatch} = this.props;
    dispatch({
      type:'menu/fetchMulDelete',
      payload:ids,
      callback:()=>{
        this.setState({ids:[]})
      }
    })
  }
  onCheck = key =>{
    this.setState({ids:key})
  }
  handleSelected = key => {
    const {onClick} = this.props;
    onClick(key[0]);
  }
  render(){
    const {
      menu={list:[]},
      loading,
    } = this.props;
    const {ids :selectedKeys} = this.state;
    const loop = data => 
      data.map(item =>{
        if(item.children && item.children.length){
          return(
            <TreeNode icon={<Icon type={item.icon} />} key={item.id} title={`${item.title}(${item.path})`}>
              {loop(item.children)}
            </TreeNode>
          )
        }
        return <TreeNode icon={<Icon type={item.icon} />} key={item.id} title={`${item.title}(${item.path})`} />
      });
    return(
      <Card 
        title="菜单列表"
        actions={[
          <Button type="danger" loading={loading} onClick={this.handleDelete}>删除</Button>
        ]}
      >
        <Tree
          showLine
          showIcon
          checkable
          blockNode={true}
          defaultExpandAll={true}
          onCheck={this.onCheck}
          defaultCheckedKeys={selectedKeys}
          checkedKeys={selectedKeys}
          onSelect={this.handleSelected}
          switcherIcon={<Icon type="down" />}
        >
          {loop(menu.list)}
        </Tree>
      </Card>
    )
  }
}
ListPage.defaultProps = {
  onClick:()=>{}
}
export default ListPage;