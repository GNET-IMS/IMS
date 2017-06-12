import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './IndexPage.css';

import Layout from '../components/Layout';

class IndexPage extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'auth/init'
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
