import React,{Component} from 'react';
import styles from '../style.less';
import {Card,Table,Divider,Button,Modal} from 'antd';
import {connect} from 'dva';
import Add from './add';
import Edit from './edit';
import Access from './access';
@connect(({ loading, role }) => ({
  role:role,
  loading: loading.effects['role/fetch'],
  eloading:loading.effects['role/fetchOne'],
  aloading:loading.effects['role/fetchAccess']
}))
class Role extends Component {
  columns=[
    {
      title:'名称',
      dataIndex:'title',
      key:'title'
    },{
      title:'描述',
      dataIndex:'remark',
      key:'remark'
    },{
      title:'添加时间',
      dataIndex:'created_at',
      key:'created_at'
    },{
      title:'操作',
      dataIndex:'handle',
      key:'handle',
      render:(v,r) => (
        <span>
          <a href="javascript:;" onClick={()=>this.handleAccess(r)}>分配权限</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={()=>this.handleEdit(r)}>编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={()=>this.handleDelete(r)}>删除</a>
        </span>
      )
    }
  ]
  state ={
    visible:false,
    accessVisible:false
  }
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type:'role/fetch'
    })
  }
  handleAccess = record =>{
    const {dispatch} = this.props;
    dispatch({
      type:'role/fetchAccess',
      payload:record.id,
      callback:()=>{
        this.setState({
          accessVisible:true
        })
      }
    })
  }
  handleEdit = record => {
    const {dispatch} = this.props;
    dispatch({
      type:'role/fetchOne',
      payload:record.id
    })
  }
  handleDelete = record =>{
    const {dispatch} = this.props;
    dispatch({
      type:'role/fetchDelete',
      payload:record.id
    })
  }
  handleShow = () => {
    this.setState({
      visible:true
    })
  }
  handleOk = value => {
    this.setState({
      visible:false
    })
  }
  handleCancel = ()=>{
    this.setState({
      visible:false,
    })
  }
  handleAccessModel = flag => {
    this.setState({
      accessVisible:flag
    })
  }
  render(){
    const {role:{list},loading,eloading,aloading} = this.props;
    const {visible,accessVisible} = this.state;
    return(
      <div className={styles.tableList}>
        <div className={styles.operator} >
          <Button type="primary" onClick={this.handleShow}>新建</Button>
        </div>
        <Add 
          visible={visible} 
          roles={list}
          onOk={this.handleOk} 
          onCancel={this.handleCancel}
        />
        {aloading === false &&<Access visible={accessVisible} onChange={this.handleAccessModel} />}
        {eloading === false && <Edit />}
        <Table
          rowKey="id"
          columns={this.columns}
          dataSource={list}
        />
      </div>
    );
  }
  
}
export default Role;
