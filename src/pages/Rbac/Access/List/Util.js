import {Menu,Dropdown,Icon} from 'antd';
function Title(props){
  return (
    <div>
      <span>
        {props.title}({props.name})
      </span>
    </div>  
  )
}
function MoreMenu(props){
  return(
    <Dropdown overlay={
      <Menu>
        <Menu.Item onClick={props.onAdd}>新增</Menu.Item>
        <Menu.Item>编辑</Menu.Item>
        <Menu.Item onClick={props.onDelete}>删除</Menu.Item>
      </Menu>
    }>
      <a className="ant-dropdown-link" href="#">
        更多<Icon type="down" />
      </a>
    </Dropdown>    
  )
}

export default {
  Title,
  MoreMenu
}