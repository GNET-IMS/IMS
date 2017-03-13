import React from 'react';
import { Row, Table, Button } from 'antd';
import { Link } from 'dva/router';
import InputSearch from '../InputSearch';
import ActionBar from '../ActionBar';
import styles from './index.css';

const Accounts = ({data}) => {
  const columns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      sorter: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'operation',
      render: (text, record, index) => {
        return <Link to={`/account/list/edit/${text}`}>编辑</Link>
      }
    },
  ]
  return (
    <div>
      <ActionBar>
        <InputSearch select={true} selectOptions={[
          { name: '姓名', value: 'name' },
          { name: '类型', value: 'type' },
        ]}
          onSearch={() => {}}
        />
        <Button size="large" style={{float: 'right'}}>添加</Button>
      </ActionBar>
      <Table columns={columns} dataSource={data} rowSelection={{}} rowKey='id' onChange={() => {}} />
    </div>
  );
};

Accounts.propTypes = {
};

export default Accounts;
