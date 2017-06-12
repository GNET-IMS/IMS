import React, { Component } from 'react';
import { Modal, Button, Upload, Icon, Row, Col, Spin, Progress, message } from 'antd';
import styles from './UploadModal.css';

class UploadModal extends Component {
  static defaultProps = {
    show: false,
    upload: () => {},
    onCancel: () => {},
    uploadUrl: '',
    uploadResponse: () => {},
  }
  state = {
    loading: false,
    uploading: false,
    imageUrl: undefined,
    status: undefined,
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('请选择正确格式的图片');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('头像必须小于2MB!');
      return false;
    }
    return true;
  }

  handleChange = (info) => {
    const { uploadResponse } = this.props;
    this.setState({ 
      status: 'uploading', 
      loading: true,
    });

    setTimeout(() => {
      this.getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false,
        })
      });
    }, 300)


    if (info.file.status === 'done') {
      this.setState({status: 'successed'});
      uploadResponse(info.file.response);
    } else if (info.file.status === 'error') {
      this.setState({
        status: 'failed',
      })
    }
  }

  beforeCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      loading: false,
      uploading: false,
      imageUrl: undefined,
      status: undefined,
    }, () => onCancel())
  }

  renderStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return <font className={styles['uploading']}>上传中<Icon type="loading" /></font>;
      case 'failed':
        return <font className={styles['failed']}>上传失败<Icon type="close" /></font>;
      case 'successed':
        return <font className={styles['successed']}>上传成功<Icon type="check" /></font>;
      default:
        return '';
    }
  }

  render() {
    const { show, uploadUrl } = this.props;
    const { imageUrl, loading, showProgress, uploading, progress, status } = this.state;
    return (
      <div>
        <Modal
          width={400}
          visible={show}
          title="头像上传"
          onCancel={this.beforeCancel}
          footer={[
            <Button key="back" size="large" onClick={this.beforeCancel}>关闭</Button>
          ]}
        >
          <Row style={{ textAlign: 'center' }}>
            <Spin className={styles['loading']} spinning={loading}>
              <Upload
                className={styles[`avatar-uploader`]}
                name="avatar"
                action={uploadUrl}
                showUploadList={false}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
                mutiple={false}
              >
                {
                  imageUrl ?
                    <img src={imageUrl} alt="" className={styles[`avatar`]} /> :
                    <Icon type="plus" className={styles['avatar-uploader-trigger']} />
                }
              </Upload>
            </Spin>
            {this.renderStatusIcon(status)}
          </Row>
        </Modal>
      </div>
    );
  }
}

export default UploadModal