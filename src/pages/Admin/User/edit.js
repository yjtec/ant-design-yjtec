import React,{Component} from 'react';
import {Modal,Form,Input} from 'antd';
import styles from './index.css';
import Role from './role';
const FormItem =  Form.Item;
class Edit extends Component{
  constructor(props) {
    super(props);
    this.state={
      visible:false
    }
  }
  componentDidMount(){
    const {data:{one}} = this.props;
    if(one){
      this.setState({visible:true})
     //console.log(123);
    }
  }
  handleSubmit = e => {
    const {
      form:{validateFieldsAndScroll},
      dispatch,
      data:{one}
    } = this.props;
    validateFieldsAndScroll((err,values)=>{
      if(!err){
        if(!values.pwd){
          delete(values.pwd);
        }
        //return false;
        dispatch({
          type:'admin/fetchPut',
          payload:{
            id:one.id,
            data:values
          }
        })

        this.setState({
          visible:false
        })
      }
    })
  }
  handleCancel = () => {
    this.setState({
      visible:false
    })
  }
  render(){
    const {
      onCancel,
      data:{one},
      form:{getFieldDecorator}
    } = this.props;
    const roles = one.roles.map(item => item.id);
    const {visible} = this.state;
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
    //console.log(this.props);
    return (
      <Modal 
        visible={visible}
        title="修改用户"
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
      >
        {one && (
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <FormItem label="账号">
            <span className="ant-form-text">{one.account}</span>
            </FormItem>

            <FormItem label="昵称">
            {getFieldDecorator('nick_name',{
              rules:[{required:true,message:'请输入昵称'}],
              initialValue:one.nick_name
            })(<Input />)}
            </FormItem>
            <FormItem label="角色">
            {getFieldDecorator('roles',{
              rules:[{required:true,message:'请选择一个角色'}],
              initialValue:roles
            })(<Role />)}
          </FormItem>            
            <FormItem label="邮箱">
            {getFieldDecorator('email',{
              rules:[{required:true,message:'请输入邮箱'}],
              initialValue:one.email
            })(<Input />)}
            </FormItem>
            <FormItem label="密码">
            {getFieldDecorator('pwd')(<Input.Password placeholder="留空不修改" />)}
            </FormItem>
          </Form>
        )}
      </Modal>
    );
  }
}
export default Form.create({name:'admin'})(Edit);
