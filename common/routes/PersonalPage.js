import React from 'react';
import { connect } from 'dva';
import Personal from '../components/Personal'
import styles from './PersonalPage.css';
import selector from '../models/personal/selector';

const PersonalPage = (props) => {
  return (
    <Personal {...props}/>
  );
}

export default connect(selector)(PersonalPage)
