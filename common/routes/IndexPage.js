import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './IndexPage.css';

import Layout from '../components/Layout';

class IndexPage extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    const callback = socket => {
      dispatch({
        type: 'auth/setSocket',
        payload: socket
      })
      socket.on('message_response', result => {
        dispatch({
          type: 'announcements/pullAnnouncements',
        })
      });

      socket.on('chat_response', result => {
        dispatch({
          type: 'chat/receiveMessage',
          payload: result
        })
      })

    }
    dispatch({
      type: 'auth/init',
      callback
    })
  }


  render() {
    const { children, routes, params, auth, dispatch } = this.props;
    return (
      <div className={styles['container']}>
        <Layout dispatch={dispatch} routes={routes} params={params} user={auth.user} unreadNum={auth.unreadNum}>{children}</Layout>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    auth: state.auth,
  }
})(IndexPage);
