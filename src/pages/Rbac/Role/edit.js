import React,{Component} from 'react';
import {Modal,Form,Input,TreeSelect,Button} from 'antd';
import styles from '../style.less';
import {connect} from 'dva';
const FormItem = Form.Item;
const {TextArea} = Input;
@connect(({ loading ,role}) => ({
  role:role,
  loading: loading.effects['role/fetchPut'],
}))
@Form.create({name:'role_form'})
class RoleEdit extends Component{
  state = {
    visible:true
  }
  componentDidMount(){
    // console.log(123);
  }
  handleOk = () => {
    const {
      form:{validateFieldsAndScroll,resetFields},
      dispatch,
      role:{one}
    } = this.props;
    validateFieldsAndScroll((err,values)=>{
      if(err) return;
      dispatch({
        type:'role/fetchPut',
        payload:{id:one.id,data:values},
        callback:() => {
          this.setState({
            visible:false
          })
          resetFields();
        }
      })
    })
  }
  handleCancel = () => {
    this.setState({
      visible:false
    })
    this.props.form.resetFields();
  }
  render(){
    const {visible} = this.state;
    const {
      role:{list,one},
      form:{getFieldDecorator},
      loading,
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
    const treeData = list.concat({
      key:'0',
      value:'0',
      title:'默认'
    })
    return (
      <Modal
        visible={visible}
        title="编辑角色"
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
            initialValue:one.title,
            rules:[{required:true,message:'请输入名称'}],
          })(<Input />)}
          </FormItem>
          <FormItem label="上级">
          {getFieldDecorator('pid',{
            initialValue:[one.pid],
          })(<TreeSelect treeData={treeData} placeholder="不选默认为一级" />)}
          </FormItem>
          <FormItem label="描述">
          {getFieldDecorator('remark',{
            initialValue:one.remark,
            rules:[{required:true,message:'请输入描述'}],
          })(<TextArea rows="3" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
export default RoleEdit;