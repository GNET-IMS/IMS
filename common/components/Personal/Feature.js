import React, { Component } from 'react';
import { Row, Col } from 'antd';
import UploadModal from './UploadModal';
import { ROOT_PATH } from '../../constants';

import styles from './Feature.css';

class Feature extends Component {

  state = {
    showUploadModal: false,
    photo: '',
  }

  render() {
    const { personal, dispatch, userId } = this.props;
    const { showUploadModal, photo } = this.state;
    return (
      <div>
        <Row>
            <Col span={8}>
                <div className={styles['photo']} 
                  onClick={() => this.setState({showUploadModal: !showUploadModal})}>
                  <img src={photo ? `${photo}` : '/public/images/chh1.jpg'} alt=""/>
                </div>
                <UploadModal 
                  show={showUploadModal}
                  onCancel={() => this.setState({showUploadModal: false})}
                  uploadUrl={`/api/users/${userId}/upload`}
                  uploadResponse={result => {
                    this.setState({photo: result.user.avatar_url});
                  }}
                />
            </Col>
            <Col span={8}></Col>
            <Col span={8}></Col>
        </Row>
      </div>
    );
  }
};

export default Feature;
