import React from 'react';
import { Row, Table, Button, Popconfirm, Icon } from 'antd';
import { Link } from 'dva/router';
import InputSearch from '../InputSearch';
import ActionBar from '../ActionBar';
import styles from './index.css';

const ButtonGroup = Button.Group;

const Users = ({data, dispatch, users}) => {
  const columns = [
    {
      title: '序号',
      dataIndex: '_id',
      key: '_id',
      render: (text, record, index) => index + 1
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
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
      title: '操作',
      dataIndex: '_id',
      key: 'operation',
      render: (text, record, index) => (
        <span>
          <Link to={`/user/list/edit/${text}`}><Icon type="edit" />编辑</Link>
          <Popconfirm title="确定要删除这个用户吗？" onConfirm={ () => {  
                         
            dispatch({
              type: 'users/delete',
              payload: record._id,
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
            <Link to={`/user/list/add`}><Icon type="user-add" /></Link>
        </Button>
        <Button size="large" type="primary">
            <Link to={`/user/list/batchadd`}><Icon type="usergroup-add" /></Link>
        </Button>
        </ButtonGroup>
      </ActionBar>
      <Table columns={columns} dataSource={data} rowSelection={{}} rowKey='__id' onChange={() => {}} />
    </div>
  );
};

Users.propTypes = {
};

export default Users;
