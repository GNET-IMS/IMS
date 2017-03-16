import React from 'react';
import { Row, Table, Button, Popconfirm, Icon } from 'antd';
import { Link } from 'dva/router';
import InputSearch from '../InputSearch';
import ActionBar from '../ActionBar';
import styles from './index.css';

const ButtonGroup = Button.Group;

const Accounts = ({data, dispatch, accounts}) => {
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
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      sorter: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
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
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      sorter: true,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      sorter: true,
    },
    {
      title: '职位',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
    },
    {
      title: '是否为管理员',
      dataIndex: 'is_admin',
      key: 'is_admin',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'operation',
      render: (text, record, index) => (
        <span>
          <Link to={`/account/list/edit/${text}`}><Icon type="edit" />编辑</Link>
          <Popconfirm title="确定要删除这个用户吗？" onConfirm={ () => {  
                         
            dispatch({
              type: 'accounts/delete',
              payload: record.id,
            })

          } } onCancel={() => {} }>
            <a href="#" style={{marginLeft:10}}><Icon type="delete" />删除</a>
          </Popconfirm>
        </span>
        
      ),
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
        <ButtonGroup style={{float: 'right'}}>
        <Button size="large" type="primary">
            <Link to="/account/list/add/${text}"><Icon type="user-add" /></Link>
        </Button>
        <Button size="large" type="primary">
            <Link to="/account/list/batchadd/${text}"><Icon type="usergroup-add" /></Link>
        </Button>
        </ButtonGroup>
      </ActionBar>
      <Table columns={columns} dataSource={data} rowSelection={{}} rowKey='id' onChange={() => {}} />
    </div>
  );
};

Accounts.propTypes = {
};

export default Accounts;
