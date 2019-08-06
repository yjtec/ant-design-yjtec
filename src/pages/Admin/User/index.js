import React,{Component,Fragment} from 'react';
import styles from './style.less';
import {Card,Button,Menu,Dropdown,Icon} from 'antd';
import {connect} from 'dva';
import Add from './add';
import List from './list';
import Edit from './edit';
import Operator from './operator';
@connect(({ loading, admin }) => ({
  data: admin,
  loading: loading.effects['admin/fetch'],
  eloading: loading.effects['admin/fetchOne']
}))
class Admin extends Component{
  constructor(props) {
    super(props);
    this.state ={
      visible:false,
      editVisible:false,
      selectedRows:[],
      search:{},
      data:{}, //编辑的数据
      mulHandle:''
    }
  }
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type:'admin/fetchRole'
    })    
    this.handleFetch({});
    
  }
  handleAdd = () => {
    this.setState({visible:true})
  }
  handleCancel = () => {
    this.setState({
      visible:false,
      editVisible:false
    })
  }
  handleOk = (values) => {
    const {dispatch} = this.props;
    dispatch({
      type:'admin/fetchSave',
      payload:values,
      callback:()=>{
        this.setState({
          visible:false
        })        
      }
    })
  }
  handleEdit = record => {
    const {dispatch} = this.props;
    dispatch({
      type:'admin/fetchOne',
      payload:record.id
    })
  }
  handleDelete = id => {
    const {dispatch} = this.props;
    dispatch({
      type:'admin/fetchDelete',
      payload:id
    })
  }
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  }
  handleSearch = values =>{
    this.setState({
      search:values
    })
    this.handleFetch({
      ...values,
      page:1
    })
  }
  handleFetch = payload => {
    const {dispatch} = this.props;
    dispatch({
      type:"admin/fetch",
      payload:payload
    })
  }
  handlePageChange = (page,pageSize) => {
    const {search} = this.state;
    this.handleFetch({
      page,pageSize,...search
    })
  }
  handleReset = () => {
    this.handleFetch({})
  }
  handleMenuClick = type => {
    this.listRef.cleanSelectedKeys();
    this.setState({
      mulHandle:type,
      selectedRows:[]
    })
  }
  handleMulAction = () => {
    const {dispatch} = this.props;
    const {selectedRows,mulHandle} = this.state;
    dispatch({
      type:'admin/fetchMul',
      payload:{
        key:selectedRows.map(row => row.id).join(','),
        type:mulHandle
      },
      callback:() =>{
        this.handleMenuClick('');
      }
    })
  }
  render(){
    const {visible,editVisible,selectedRows,mulHandle} = this.state;
    const {eloading,data:{handleItem}} = this.props;
    const menu = (
      <Menu onClick={e => this.handleMenuClick(e.key)}>
        {Object.keys(handleItem).map(item =>
          <Menu.Item key={item}>{handleItem[item].label}</Menu.Item>
        )}
      </Menu>
    )
    return (
      <div className={styles.TableList}>
        <Add 
          visible={visible} 
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        />
          {eloading === false && (<Edit
            {...this.props}
            // visible={editVisible}
            // onCancel={this.handleCancel}
          />)
        }
        <Card>
          <div className={styles.form}>
          <Operator {...this.props} 
            onSearch={this.handleSearch}
            onReset={this.handleReset}
          />
          </div>
          <div className={styles.operator}>
            {mulHandle ? (
              <Fragment>
                <span>
                  <Button onClick={this.handleMulAction} disabled={selectedRows.length == 0} type="primary" >
                  {handleItem[mulHandle].label}
                  </Button>
                </span>
                <Button onClick={()=>this.handleMenuClick('')}>取消</Button>
              </Fragment>
            ):(
            <Fragment>
              <Button onClick={this.handleAdd} type="primary">新建</Button>
              <Dropdown overlay={menu}>
                <Button>
                  批量操作 <Icon type="down" />
                </Button>
              </Dropdown>
            </Fragment>
            )}
          </div>
          <List 
            {...this.props}
            mulHandle={mulHandle}
            selectedRows={selectedRows}
            onEdit={this.handleEdit}
            onDelete={this.handleDelete}
            onSelectRow={this.handleSelectRows}
            onPageChange={this.handlePageChange}
            ref={ref => this.listRef = ref}
          />
        </Card>
      </div>
      
    );
  }
}
export default Admin;
