import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

import Layout from '../components/Layout';

const IndexPage = ({children, routes, params}) => {
  return (
    <div className={styles['container']}>
      <Layout routes={routes} params={params}>{children}</Layout>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
