import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.less';
import {Form,Tabs} from 'antd';
import LoginTab from './LoginTab';
import LoginItem from './LoginItem';
import LoginSubmit from './LoginSubmit';
import LoginContext from './LoginContext';
class Login extends Component{
  static propTypes = {
    className:PropTypes.string,
    defaultActiveKey:PropTypes.string,
    onTabChange:PropTypes.func,
    onSubmit:PropTypes.func,
  };
  static defaultProps={
    className:'',
    defaultActiveKey:'',
    onTabChange: () =>{},
    onSubmit:() => {},
  }
  constructor(props) {
    super(props);
    this.state = {
      type:props.defaultActiveKey,
      tabs:[],
      active:{}
    }
  }
  onSwitch = type => {
    this.setState({type});
    const {onTabChange} = this.props;
    onTabChange(type);
  }
  handleSubmit = e => {
    e.preventDefault();
    const {active,type} = this.state;
    const {form,onSubmit} = this.props;
    const activeFileds = active[type];
    form.validateFields(activeFileds,{force:true},(err,values) => {
      onSubmit(err,values);
    })
  }
  getContext = () =>{
    const {tabs} = this.state;
    const {form} = this.props;
    return {
      tabUtil: {
        addTab: id => {
          this.setState({
            tabs: [...tabs, id],
          });
        },
        removeTab: id => {
          this.setState({
            tabs: tabs.filter(currentId => currentId !== id),
          });
        },
      },
      form,
      updateActive:activeItem => {
        const {type,active} = this.state;
        if(active[type]){
          active[type].push(activeItem);
        }else{
          active[type] = [activeItem];
        }
        this.setState({
          active,
        })
      }
    }
  }
  render(){
    const {className,children} = this.props;
    const {type,tabs} = this.state;
    const TabChildren = [];
    const OtherChildren = [];
    React.Children.forEach(children,item=>{
      if(!item){
        return;
      }
      if(item.type.typeName == 'LoginTab'){
        TabChildren.push(item);
      }else{
        OtherChildren.push(item);
      }
    })
    return (
      <LoginContext.Provider value={this.getContext()}>
        <div className={classNames(className,styles.login)}>
          <Form onSubmit={this.handleSubmit}>
            {tabs.length ?(
              <React.Fragment>
                <Tabs
                  animated={false}
                  className={styles.tab}
                  activeKey={type}
                  onChange={this.onSwitch}
                >
                  {TabChildren}
                </Tabs>
                {OtherChildren}
              </React.Fragment>
            ):(
              children
            )}
          </Form>
        </div>
      </LoginContext.Provider>
    )
  }
}
Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach(item => {
  Login[item] = LoginItem[item];
})
export default Form.create()(Login);