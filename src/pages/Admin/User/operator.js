import React,{Component} from 'react';
import {Form,Row,Col,Input,Select,DatePicker,Button,Icon} from 'antd';
import styles from './style.less';
import Role from './role';
const {RangePicker} = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
class Operator extends Component{
  state = {
    expand:false
  }
  toggleForm = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand,
    });
  }
  handleSearch = e => {
    e.preventDefault();

    const {form,onSearch} = this.props;
    form.validateFields((err,fieldsValue) => {
      if(err) return;
      let values = {
        ...fieldsValue
      }
      if(fieldsValue.timeRange){
        const [stime,etime] = fieldsValue.timeRange;
        values['stime'] = stime.format('YYYY-MM-DD');
        values['etime'] = etime.format('YYYY-MM-DD');
        delete(values.timeRange);
      }
      if(onSearch) onSearch(values);
    })
  }
  handleFormReset = e => {
    const {onReset,form} = this.props;
    form.resetFields();
    if(onReset) onReset();
  }
  renderAdvanceForm(){
    const {
      form:{getFieldDecorator}
    } = this.props;
    return(
      <Form layout="inline" onSubmit={this.handleSearch}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="账号">
            {getFieldDecorator('account')(
              <Input  />
            )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="昵称">
            {getFieldDecorator('nick_name')(
              <Input  />
            )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="邮箱">
            {getFieldDecorator('email')(
              <Input  />
            )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="状态">
            {getFieldDecorator('status')(
              <Select style={{width:'100%'}} placeholder="状态">
                <Option value="1">启用</Option>
                <Option value="-1">禁用</Option>
              </Select>
            )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="时间">
              {getFieldDecorator('timeRange')(
                <RangePicker />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="角色">
            {getFieldDecorator('roles')(
              <Role />
            )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>      
    )
  }
  renderSimpleForm(){
    const {
      form:{getFieldDecorator}
    } = this.props;    
    return(
      <Form layout="inline" onSubmit={this.handleSearch}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="账号">
            {getFieldDecorator('account')(
              <Input  />
            )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="昵称">
            {getFieldDecorator('status')(
              <Select style={{width:'100%'}} placeholder="状态">
                <Option value="1">启用</Option>
                <Option value="-1">禁用</Option>
              </Select>
            )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }
  renderForm(){
    const {expand} = this.state;
    return expand ? this.renderAdvanceForm() : this.renderSimpleForm();
  }
  render(){
    const {
      form:{getFieldDecorator}
    } = this.props;
    return(
      <div>{this.renderForm()}</div>
    )
  }
}
export default Form.create({name:'operator'})(Operator);