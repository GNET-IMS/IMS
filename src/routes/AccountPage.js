import React from 'react';
import { connect } from 'dva';
import styles from './AccountPage.css';
import selector from '../models/accounts/selector';
import Accounts from '../components/Accounts';
import Edit from '../components/Accounts/Edit';
import Add from '../components/Accounts/Add';

const AccountPage = ({accounts}) => {
  return (
    <div className={styles['account']}>
      <Accounts data={accounts.accounts}></Accounts>
    </div>
  );
}

AccountPage.propTypes = {
};

const Account = connect(selector)(AccountPage);
const AccountEdit = connect(selector)(Edit);
const AccountAdd = connect(selector)(Add);

export {
  Account as default,
  AccountEdit,
  AccountAdd,
}
