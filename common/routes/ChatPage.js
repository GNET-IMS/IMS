import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './ChatPage.css';
import selector from '../models/chat/selector';
import Chat from '../components/Chat';

class ChatPage extends Component {

  componentDidMount() {
    
  }


  render() {
    const { dispatch, userId, user, chat, loading } = this.props;
    return (
      <div className={styles['container']}>
          <Chat dispatch={dispatch} userId={userId} chat={chat} user={user} loading={loading}></Chat>
      </div>
    );
  }
}

export default connect(selector)(ChatPage);
