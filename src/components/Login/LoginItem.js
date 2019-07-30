import React,{Component} from 'react';
import {Form,Input,Button,Row,Col} from 'antd';
import omit from 'omit.js';
import styles from './index.less';
import ItemMap from './map';
import LoginContext from './LoginContext';
const FormItem = Form.Item;
class WrapFormItem extends Component{
  static defaultProps = {
    getCaptchaButtonText: 'captcha',
    getCaptchaSecondText: 'second',
  }
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentDidMount(){
    const {updateActive,name} = this.props;
    if(updateActive){
      updateActive(name);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onGetCaptcha = () =>{
    const {onGetCaptcha} = this.props;
    const result = onGetCaptcha ? onGetCaptcha() : null;
    if(result instanceof Promise){
      result.then(this.runGetCaptchaCountDown);
    }else{
      this.runGetCaptchaCountDown();
    }
  }
  runGetCaptchaCountDown = () => {
    const {countDown} = this.props;
    let count = countDown || 59;
    this.setState({count});
    this.interval = setInterval(()=>{
      count -=1;
      this.setState({count});
      if(count === 0){
        clearInterval(this.interval);
      }
    },1000)
  }
  getFormItemOptions = ({onChange,defaultValue,customprops,rules}) => {
    const options = {
      rules:rules || customprops.rules
    }
    if(onChange){
      options.onChange = onChange
    }
    if(defaultValue){
      options.initialValue = defaultValue;
    }

    return options;
  }
  render(){
    const {count} = this.state;
    const {
      onChange,
      customprops,
      defaultValue,
      rules,
      name,
      getCaptchaButtonText,
      getCaptchaSecondText,
      updateActive,
      type,
      ...restProps
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const otherProps = restProps || {};
    const options = this.getFormItemOptions(this.props);
    if (type === 'Captcha') {
      const inputProps = omit(otherProps,['onGetCaptcha','countDown']);
      return(
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator(name,options)(<Input {...customprops} {...inputProps} />)}
            </Col>
            <Col span={8}>
              <Button
              disabled={count}
              className={styles.getCaptcha}
              size="large"
              onClick={this.onGetCaptcha}
              >
                {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
              </Button>
            </Col>
          </Row>
        </FormItem>
      )
    }
    return (
      <FormItem>
        {getFieldDecorator(name,options)(<Input {...customprops} {...otherProps} />)}
      </FormItem>
    )
  }
}
const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customprops={item.props}
          rules={item.rules}
          {...props}
          type={key}
          updateActive={context.updateActive}
          form={context.form}
        />
      )}
    </LoginContext.Consumer>
  );
});
export default LoginItem;