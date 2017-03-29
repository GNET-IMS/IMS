import React from 'react';
import { connect } from 'dva';
import styles from './HomePage.css';

import Layout from '../components/Layout';

const HomePage = ({children}) => {
  return (
    <div className={styles['home']}>
      home
    </div>
  );
}

HomePage.propTypes = {
};

export default connect()(HomePage);
