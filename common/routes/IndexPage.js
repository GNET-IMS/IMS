import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './IndexPage.css';

import Layout from '../components/Layout';

class IndexPage extends Component {
  render() {
    const { children, routes, params, auth } = this.props;
    return (
      <div className={styles['container']}>
        <Layout routes={routes} params={params} userId={auth.userId}>{children}</Layout>
      </div>
    );
  }
}

export default connect((state) => {
  return { 
    auth: state.auth
  }
})(IndexPage);