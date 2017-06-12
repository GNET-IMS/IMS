import React, { Component } from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment';

import styles from './index.css';

class Announcement extends Component {
  static defaultProps = {
    showModal: false,
  }
  state = {
    selectedRowKeys: undefined
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { loading, dispatch, announcements, showModal } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const columns = [{
      title: '发件人',
      dataIndex: 'sender_name',
      render: text => text || '系统通知'
    }, {
      title: '状态',
      dataIndex: 'is_read',
      render: (text, record, index) => {
        return <Tag color={record.is_read ? 'blue' : 'pink'}>{record.is_read ? '已读' : '未读'}</Tag>
      }
    }, {
      title: '内容',
      dataIndex: 'content',
      width: 400,
      render: (text, record, index) => {
        return <a href="javascript:;" onClick={() => {
          dispatch({
            type: 'notices/view',
            payload: {
              showModal: true,
              ...record,
            }
          })
        }} >{text}</a>
      }
    }, {
      title: '发送时间',
      dataIndex: 'create_date',
      render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text, record, index) => {
        return <span>
          <a href="javascript:;" onClick={() => {
            dispatch({
              type: 'notices/delete',
              payload: record.id
            })
          }}>删除</a>
        </span>
      }
    }];
    return (
      <div>
        {
          announcements.needUpdate ? 
            <div>
              有新的公告，请刷新！
            </div>
            : ''
        }
        <Table
          rowKey={record => record.id}
          rowSelection={rowSelection}
          dataSource={announcements.announcements}
          columns={columns}
          pagination={announcements.pagination}
        />
      </div>
    )
  }
};

export default Announcement;