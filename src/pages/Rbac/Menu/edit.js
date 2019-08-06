import React,{Component} from 'react';
import {Form,Card,Input,Button,TreeSelect,Row,Col,Switch} from 'antd';
import {connect} from 'dva';
const FormItem =  Form.Item;
const {TextArea} = Input;
const format = data => 
  data.map(item => {
    const result = {
      ...item,
      key:item.id,
      value:item.id
    }
    if(item.children){
      result.children = format(item.children);
    }
    return result;
  }) 
@connect(({loading,menu,access,role})=>({
  loading:loading.effects['menu/fetchUpdate'],
  menu:menu,
  access:access,
  role:role
}))
@Form.create()
class EditComponent extends Component{
  state ={}
  handleCancel = () => {
    const {form:{resetFields},onCancel} = this.props;
    resetFields();
    onCancel();
  }
  handleSubmit = () => {
    const {
      form:{validateFieldsAndScroll,resetFields},
      dispatch,
      menu:{one},
      onCancel
    } =this.props;
    validateFieldsAndScroll((err,values) => {
      if(err) return;
      dispatch({
        type:"menu/fetchUpdate",
        payload:{
          id:one.id,
          data:{
            ...values,
            is_show:values.is_show ? 1 : 0,
            is_show_children:values.is_show_children ? 1 : 0
          }
        },
        callback:()=>{
          resetFields();
          onCancel();
        }
      })
      // onSubmit(err,values);
    })
  }
  render(){
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const {
      form:{getFieldDecorator},
      loading,
      fetching,
      menu={tree:[],one:{}},
      access={list:[]},
      role={role:[]}
    } = this.props;
    return(
      <Card 
        title="编辑菜单"
        loading={fetching}
        actions={[
          <Button type="primary" loading={loading} onClick={this.handleSubmit}>保存</Button>,
          <Button onClick={this.handleCancel}>取消</Button>
        ]}
      >
        <Form {...formItemLayout}>
          <FormItem label="父级">
          {getFieldDecorator('pid',{
            initialValue:menu.one.pid
          })(<TreeSelect treeData={menu.tree} placeholder="不选为顶级" />)}
          </FormItem>
          <FormItem label="名称">
          {getFieldDecorator('title',{
            initialValue:menu.one.title,
            rules:[{required:true,message:'请输入名称'}],
          })(<Input />)}
          </FormItem>
          <FormItem label="标识">
          {getFieldDecorator('name',{
            initialValue:menu.one.name,
            rules:[{required:true,message:'请输入标识'}],
          })(<Input />)}
          </FormItem>
          <FormItem label="图标">
          {getFieldDecorator('icon',{
            initialValue:menu.one.icon,
          })(<Input />)}
          </FormItem>
          <FormItem label="路径">
          {getFieldDecorator('path',{
            initialValue:menu.one.path,
          })(<Input />)}
          </FormItem>
          <FormItem label="权限">
          {getFieldDecorator('access_id',{
            initialValue:menu.one.access_id,
          })(<TreeSelect treeData={format(access.list)} placeholder="选择绑定一个权限" />)}
          </FormItem>
          <FormItem label="角色">
          {getFieldDecorator('roles',{
            initialValue:menu.one.roles_ids
          })(<TreeSelect multiple treeData={format(role.list)} placeholder="角色" />)}
          </FormItem>
          <Row style={{paddingLeft:'25px'}}>
            <Col span={12}>
              <FormItem>
                <span style={{paddingRight:'10px'}}>是否显示</span>
                {getFieldDecorator('is_show',{
                  initialValue:menu.one.is_show,
                  valuePropName:'checked'
                }
                )(<Switch />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                <span style={{paddingRight:'10px'}}>是否显示子菜单</span>
                {getFieldDecorator('is_show_children',{
                  initialValue:menu.one.is_show_children,
                  valuePropName:'checked'
                }
                )(<Switch />)}
              </FormItem>
            </Col>
          </Row>          
        </Form>
      </Card>
    )
  }
}
EditComponent.defaultProps = {
  onCancel:()=>{}
}

export default EditComponent;