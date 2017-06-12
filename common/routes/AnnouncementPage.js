import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './AnnouncementPage.css';
import selector from '../models/announcements/selector';
import Announcement from '../components/Announcement';

class AnnouncementPage extends Component {

  componentDidMount() {
    
  }


  render() {
    const { dispatch, userId, user, announcements, loading } = this.props;
    return (
      <div className={styles['container']}>
          <Announcement dispatch={dispatch} userId={userId} announcements={announcements} user={user} loading={loading}></Announcement>
      </div>
    );
  }
}

export default connect(selector)(AnnouncementPage);
