import React,{Component} from 'react';
import {Modal,Form,Input} from 'antd';
import styles from './index.css';
import Avatar from './avatar';
import Role from './role';
const FormItem =  Form.Item;
class Add extends Component{
  handleSubmit = e => {
    const {
      form:{validateFieldsAndScroll},
      onOk
    } = this.props;
    validateFieldsAndScroll((err,values)=>{
      if(!err){
        onOk(values);
      }
    })
  }
  render(){
    const {
      visible,
      onCancel,
      role,
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
    return (
      <Modal 
        visible={visible}
        title="新增用户"
        onCancel={onCancel}
        onOk={this.handleSubmit}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <FormItem label="头像">
            {getFieldDecorator('avatar',{
              rules:[{required:true,message:'头像不得为空'}]
            })(<Avatar />)}
          </FormItem>
          <FormItem label="账号">
          {getFieldDecorator('account',{
            rules:[{required:true,message:'请输入用户名'}]
          })(<Input />)}
          </FormItem>

          <FormItem label="昵称">
          {getFieldDecorator('nick_name',{
            rules:[{required:true,message:'请输入昵称'}]
          })(<Input />)}
          </FormItem>

          <FormItem label="角色">
          {getFieldDecorator('roles',{
            rules:[{required:true,message:'请选择一个角色'}]
          })(<Role />)}
          </FormItem>

          <FormItem label="邮箱">
          {getFieldDecorator('email',{
            rules:[{required:true,message:'请输入邮箱'}]
          })(<Input />)}
          </FormItem>
          <FormItem label="密码">
          {getFieldDecorator('pwd',{
            rules:[{required:true,message:'请输入密码'}]
          })(<Input.Password />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default Form.create({name:'admin'})(Add);
