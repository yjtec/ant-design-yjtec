import React,{Component} from 'react';
import {Upload,Icon} from 'antd';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
class Avatar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    }
  }
  handleChange = info => {
    if(info.file.status === 'uploading'){
      this.setState({loading:true});
      return;
    }

    if(info.file.status === 'done'){
      getBase64(info.file.originFileObj,imageUrl => 
        this.setState({
          imageUrl,
          loading:false
        })
      )

      const {onChange} = this.props;
      onChange(info.file.response.path);
    }
  }
  render(){
    const UploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    )
    const {imageUrl} = this.state;
    
    return(
      <Upload
       name="avatar"
       listType="picture-card"
       className="avatar-uploader"
       action="/api/upfile"
       name="file"
       data={{
        path:'avatar',
        foreign_key:'1'
       }}
       showUploadList={false}
       onChange={this.handleChange}
       >
        {imageUrl ? <img src={imageUrl} width="80" alt="avatar" /> :UploadButton}
      </Upload>
    )
  }
}
export default Avatar;