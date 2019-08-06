import React,{Component,Fragment} from 'react';
import styles from '../style.less';
import {Table ,Divider} from 'antd';
import {connect} from 'dva';
const funcData = {
  '1' :{label:'模块',value:'2'},
  '2' :{label:'功能',value:'3'},
  '3' :{label:'操作',value:'4'}
}
@connect(({loading,access})=>({
  loading:loading.effects['access/fetch'],
  access:access
}))
class AccestList extends Component{
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type:'access/fetch'
    })
  }  
  columns = [{
    title:"权限名称",
    dataIndex:'title',
    key:'title'
  },{
    title:"标识",
    dataIndex:'name',
    key:'name'
  },{
    title:'创建时间',
    dataIndex:"created_at",
    key:'created_at'
  },{
    title:"操作",
    dataIndex:'handle',
    key:'handle',
    render:(t,r)=>(
      <span>
        {Object.keys(funcData).some(item => item == r.level) && 
          <Fragment>
            <a 
              href="javascript:;"
              onClick={() => this.props.onChange(true,r.level,r.id)}
              >
              新增{funcData[r.level].label}
            </a>
            <Divider type="vertical" />
          </Fragment>
        }
        {/*<a href="javascript:;" onClick = {()=>this.handleEdit(r.id)}>编辑</a>
        <Divider type="vertical" />*/}
        <a href="javascript:;" onClick={()=>this.handleDelete(r.id)}>删除</a>
      </span>
    )
  }]
  handleEdit = id => {
    const {dispatch} = this.props;
    dispatch({
      type:'access/fetchOne',
      payload:id
    })
  }
  handleDelete = id => {
    const {dispatch} = this.props;
    dispatch({
      type:'access/fetchDelete',
      payload:id
    })
  }  
  render(){
    const {
      loading,
      access:{list}
    } = this.props;
    return(
      <div>
        <Table 
          dataSource={list} 
          rowKey="id"
          columns={this.columns}
          loading={loading}
          pagination={false}
        />
      </div>
    )
  }
}
export default AccestList;