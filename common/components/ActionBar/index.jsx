import React, { Component } from 'react';
import styles from './index.css';

class ActionBar extends Component {


  render() {
    const { children } = this.props;
    return (
      <div className={styles['actionBar']}>
        {children}
      </div>
    );
  }
};

export default ActionBar;
