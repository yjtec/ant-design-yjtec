import React,{Component} from 'react';
import styles from '../style.less';
import {Button,Modal,Form} from 'antd';
import Module from './module';
import {connect} from 'dva';
const dataItem = {
  '0':{label:'应用'},
  '1':{label:'模块'},
  '2':{label:'功能'},
  '3':{label:'操作'}
}
@connect(({loading,access})=>({
  access:access,
  loading:loading.effects['access/fetchSave']
}))
@Form.create({name:'access_add_form'})
class AccessAdd extends Component{
  state = {
    visible:true
  }
  handleOk = () => {
    const {
      form:{validateFieldsAndScroll,resetFields},
      dispatch,
      level,
      onChange,
      pid
    } = this.props;
    validateFieldsAndScroll((err,values)=>{
      if(err) return;
      const FieldValues = {
        ...values,
        pid,
        level:level + 1
      }
      dispatch({
        type:'access/fetchSave',
        payload:FieldValues,
        callback:()=>{
          onChange(false);
          resetFields();
        }
      })
    })
  }
  handleCancel = () =>{
    const {onChange,form:{resetFields}} = this.props;
    resetFields();onChange(false);
  }
  render(){
    const {
      visible,
      level,
      pid,
      loading
    } = this.props;
    const title = dataItem[level];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return(
      <div className={styles.AccessList}>
        <Modal
          visible={visible}
          title={'新增'+dataItem[level].label}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk} >确定</Button>
          ]}
        >
          <Form {...formItemLayout}>
          {level == 0 && <Module.App {...this.props} />}
          {level == 1 && <Module.Module {...this.props} />}
          {level == 2 && <Module.Method {...this.props} />}
          {level == 3 && <Module.Method {...this.props} />}
          </Form>
        </Modal>
      </div>
    )
  }
}
export default AccessAdd;