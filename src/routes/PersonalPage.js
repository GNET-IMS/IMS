import React from 'react';
import { connect } from 'dva';
import styles from './PersonalPage.css';
import selector from '../models/users/selector';

const PersonalPage = ({dispatch}) => {
  return (
    <Personal />
  );
}

PersonalPage.propTypes = {
};

const Personal = connect(selector)(PersonalPage);

export {
  Personal as default,
}
