import React,{Component} from 'react';
import styles from '../style.less';
import {Modal,Form,Input,TreeSelect,Button} from 'antd';
import {connect} from 'dva';
const FormItem =  Form.Item;
const {TextArea} = Input;
@connect(({ loading }) => ({
  loading: loading.effects['role/fetchSave'],
}))
@Form.create({name:'role_form'})

class RoleAdd extends Component {
  
  handleOk = () => {
    const {
      form:{validateFieldsAndScroll,resetFields},
      dispatch,
      onOk
    } = this.props;
    validateFieldsAndScroll((err,values)=>{
      if(err) return;
      dispatch({
        type:'role/fetchSave',
        payload:values,
        callback:()=>{
          resetFields();
          onOk();
        }
      })
    })
  }
  handleCancel = () => {
    const {
      onCancel,
      form:{resetFields}
    } = this.props;
    resetFields();
    onCancel();
  }
  render(){
    const {
      visible,
      roles,
      loading,
      form:{getFieldDecorator}
    } = this.props;
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
      <Modal
        visible={visible}
        title="新增角色"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk} >确定</Button>
        ]}
      >
        <Form {...formItemLayout}>
          <FormItem label="名称">
          {getFieldDecorator('title',{
            rules:[{required:true,message:'请输入名称'}],
          })(<Input />)}
          </FormItem>
          <FormItem label="上级">
          {getFieldDecorator('pid',{
          })(<TreeSelect treeData={roles} placeholder="不选默认为一级" />)}
          </FormItem>
          <FormItem label="描述">
          {getFieldDecorator('remark',{
            rules:[{required:true,message:'请输入描述'}],
          })(<TextArea rows="3" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
  
}
export default RoleAdd;
