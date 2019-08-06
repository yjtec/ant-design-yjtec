import React,{Component} from 'react';
import {connect} from 'dva';
import { TreeSelect } from 'antd';
const { SHOW_PARENT } = TreeSelect;

@connect(({ loading, admin }) => ({
  role: admin.role,
  loading: loading.effects['admin/fetchRole'],
}))
class Role extends Component{
  state={
    value:[]
  }
  componentDidMount(){
    const {value} = this.props;
    this.setState({
      value:value
    })
  }
  onChange = value => {
    const {onChange} = this.props;
    this.setState({value:value});
    if(onChange) onChange(value);
  }
  render(){
    const {role} = this.props;
    const tProps = {
      treeData:role,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      treeDefaultExpandAll:true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      style: {
        width: '100%',
      },
    };
    return(
      <div>
        <TreeSelect {...tProps} placeholder="选择角色" />
      </div>
    )
  }
}
export default Role;