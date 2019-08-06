import React,{Component} from 'react';
import {Row,Col} from 'antd';
import {connect} from 'dva';
import styles from '../style.less';
import Add from './add';
import List from './list';
import Edit from './edit';
@connect(({loading,menu,access})=>({
  loading:loading,
  menu:menu,
  access:access
}))
class MenuPage extends Component{
  state ={
    visible:false
  }
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type:'menu/fetch'
    })

    dispatch({
      type:'access/fetch'
    })

    dispatch({
      type:'role/fetch'
    })
  }
  handleEdit = id => {
    this.setState({visible:true})
    const {dispatch} = this.props;
    dispatch({
      type:"menu/fetchOne",
      payload:id
    })
  }
  handleCancel = () => {
    this.setState({
      visible:false
    })
  }
  render(){
    const {visible} = this.state;
    const {
      loading,
    } = this.props;
    return(
      <Row className={styles.Menu}>
        <Col span={11} >
          <List onClick={this.handleEdit}/>
        </Col>
        <Col span={11} offset={1}>
          { visible ? 
            <Edit 
              fetching={loading.effects['menu/fetchOne']} 
              onCancel={this.handleCancel} 
            /> : 
            <Add />}
        </Col>
      </Row>
    )
  }
}

export default MenuPage;