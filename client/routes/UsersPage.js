import React from 'react';
import { connect } from 'dva';
import styles from './UsersPage.css';
import selector from '../models/users/selector';
import Users from '../components/Users';
import Edit from '../components/Users/Edit';
import View from '../components/Users/View';
import Add from '../components/Users/Add';
import BatchAdd from '../components/Users/BatchAdd';

const UsersPage = ({users, dispatch, loading}) => {
  return (
    <div className={styles['user']}>
      <Users dispatch={dispatch} users={users} loading={loading}></Users>
    </div>
  );
}

UsersPage.propTypes = {
};

const User = connect(selector)(UsersPage);
const UserEdit = connect(selector)(Edit);
const UserView = connect(selector)(View);
const UserAdd = connect(selector)(Add);
const UserBatchAdd = connect(selector)(BatchAdd);

export {
  User as default,
  UserEdit,
  UserView,
  UserAdd,
  UserBatchAdd,
}
