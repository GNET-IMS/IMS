import React from 'react';
import { Table, Tag } from 'antd';

import styles from './index.css';
import Content from './Content';


const Message = ({ dispatch, messages }) => {
  const columns = [
    {
      title: '',
      dataIndex: 'content',
      width: 600,
      className: 'deleteall',
      key: 'content',
      render: (text, record) => (
        <span className={styles['content']}>
          <Tag color={record.is_read ? 'blue' : 'pink'}>{record.is_read ? '已读' : '未读'}</Tag>
          <a href="javascript:;" onClick={() => {
            dispatch({
              type: 'messages/view',
              payload: {
                showModal: true,
                ...record,
              }
            })
          }} >{text}</a>
        </span>
      )
    },
    {
      title: '',
      dataIndex: '_id',
      key: 'operation',
      width: 30,
      render: (text, record, index) => (
        <span>
          <a href="javascript:;" onClick={() => {
            dispatch({
              type: 'messages/delete',
              payload: record._id
            })
          }}>删除</a>
        </span>
      )
    }
  ];
  return (
    <div>
      <Table showHeader={false} rowKey={record => record._id} dataSource={messages.messages} columns={columns} pagination={{ pageSize: 7 }} />
      <Content
        dispatch={dispatch}
        visible={messages.showModal}
        message={messages} />
    </div>
  );
};

export default Message;