import React, { Component } from 'react';
import { Table, Tag, Button } from 'antd';
import moment from 'moment';
import BaseTable from '../BaseTable';
import LoadMore from '../LoadMore';
import AddModal from './AddModal';
import DetailModal from './DetailModal';

import styles from './index.css';

class Announcement extends Component {
  static defaultProps = {
    showModal: false,
  }
  state = {
    selectedRowKeys: undefined
  }

  onChange = query => {
    const { dispatch } = this.props;
    dispatch({
      type: 'announcements/getAnnouncements',
      payload: query
    })
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  closeDetailModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'announcements/toggleModal',
      payload: false
    })
  }

  render() {
    const { loading, dispatch, announcements } = this.props;
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
            type: 'announcements/show',
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
              type: 'announcements/delete',
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
            <LoadMore
              needUpdateLabel='有新的公告，点击刷新！'
              onLoad={cb => {
                const success = () => {
                  cb(() => {
                    dispatch({
                      type: 'announcements/toggleNeedUpdate',
                      payload: false
                    })
                  });
                }

                dispatch({
                  type: 'announcements/getAnnouncements',
                  callback: success
                })
              }}
            /> : ''
        }
        <div className={styles['operation-bar']}>
          <Button>删除</Button>
          <AddModal dispatch={dispatch} />
        </div>
        <BaseTable
          rowKey={record => record.id}
          rowSelection={rowSelection}
          dataSource={announcements.announcements}
          columns={columns}
          pagination={announcements.pagination}
          defaultOnChangeCallback={this.onChange}
        />
        <DetailModal
          visible={announcements.showModal}
          current={announcements.current}
          onOk={this.closeDetailModal}
          onCancel={this.closeDetailModal}
        />
      </div>
    )
  }
};

export default Announcement;