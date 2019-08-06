import React,{Component,Fragment} from 'react';
import {Table,Divider,Tag,Alert} from 'antd';
import styles from './style.less';
const statusArr = {
  '1':{label:'启用',color:'geekblue'},
  '-1':{label:'禁用',color:'red'}
}
export default class List extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys:[]
    }
  }
  columns =[{
    title:'ID',
    dataIndex:'id',
    key:'id'
  },{
    title:'头像',
    dataIndex:'avatar_url',
    key:'avatar_url',
    render:value => <img width="40" src={value} />
  },{
    title:'账号',
    dataIndex:'account',
    key:'account'
  },{
    title:'角色',
    dataIndex:'roles',
    key:'roles',
    render:value => <div>
      {value.map(item=>
        <Tag key={item.id} color="gold">{item.title}</Tag>
      )}
    </div>
  },{
    title:'昵称',
    dataIndex:'nick_name',
    key:'nick_name'
  },{
    title:'邮箱',
    dataIndex:'email',
    key:'email'
  },{
    title:'状态',
    dataIndex:'status',
    key:'status',
    render:(value,record) => (
      <Tag color={statusArr[value].color}>
        {statusArr[value].label}
      </Tag>
    )
  },{
    title:'创建时间',
    dataIndex:'created_at',
    key:'created_at'
  },{
    title:'操作',
    dataIndex:'handle',
    key:'handle',
    render:(text,record) => {
      const {onEdit,onDelete} = this.props;
      return(
        <span>
          <a href="javascript:;" onClick={() => onEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={()=>onDelete(record.id)}>删除</a>
        </span>
      )
    }  
  }]
  handleEdit = record => {
    //console.log(record);
  }
  handlePage = (page,pageSize) => {
    const {onPageChange} = this.props;
    if(onPageChange) onPageChange(page,pageSize);
  }
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    //console.log(selectedRowKeys,selectedRows);
    const {onSelectRow} = this.props;
    if(onSelectRow) onSelectRow(selectedRows);
    this.setState({selectedRowKeys});
  }
  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };
  render(){
    const {
      data:{data,pagination,handleItem},
      mulHandle,
      selectedRows
    } = this.props;
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.status == handleItem[mulHandle].value,
      })
    }
    return(
      <div className={styles.table}>
        {mulHandle && (
        <div className={styles.alert}>
          <Alert
            message ={
              <Fragment>
                已选择<a >{selectedRowKeys.length}</a>项
                <a onClick={this.cleanSelectedKeys}>清空</a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>
        )}
        <Table 
          columns={this.columns} 
          dataSource={data} 
          rowKey="id"
          {...(mulHandle ? {rowSelection:rowSelection} : {})}
          pagination={{
            onChange:this.handlePage,
            ...pagination
          }}
        />
      </div>
      
    )
  }
}