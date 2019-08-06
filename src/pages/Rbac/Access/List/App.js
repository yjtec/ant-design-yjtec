import C from './Util';
function Empty(props){
  return (
    <div>
      {props.title}empty
    </div>
  )
}

function NotEmpty(props){
  console.log(props);
  return (
    <div>
      {props.title}
      
    </div>
  )
}

export default {
  Empty,
  NotEmpty
}