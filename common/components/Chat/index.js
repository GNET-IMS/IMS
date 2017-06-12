import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Table, Tag } from 'antd';
import moment from 'moment';
import { ROOT_PATH } from '../../constants';

import styles from './Message.css';
import Room from '../Chat/Room';


class Message extends Component {
  static defaultProps = {
    chat: {},
  }
  state = {
    selectedRowKeys: undefined,
    showChatModal: false,
    currentTarget: {},
    currentRoomId: '',
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { loading, dispatch, chat, userId, user } = this.props;
    const { rooms, messages } = chat;
    const { selectedRowKeys, showChatModal, currentRoomId, currentTarget } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const columns = [{
      title: '发件人',
      dataIndex: 'name',
      render: (text, record) => {
        const target = userId == record.first_member_id ? {
          id: record.second_member_id,
          name: record.second_member_name,
          avatar_url: record.second_member_avatar,
        } : {
            id: record.first_member_id,
            name: record.first_member_name,
            avatar_url: record.first_member_avatar
          }
        this.targets = {};
        this.targets[record.id] = target;
        return (
          <div className={styles['user']}>
            <img src={`${ROOT_PATH}${target.avatar_url}`} alt="" />
            <font className={styles['name']}>{target.name}</font>
          </div>
        )
      }
    }, {
      title: '未读数',
      dataIndex: 'unread_num',
      render: (text, record, index) => {
        return <Tag color={text == 0 ? 'blue' : 'pink'}>{text}</Tag>
      }
    }, {
      title: '内容',
      dataIndex: 'newest_content',
      width: 400,
      render: (text, record, index) => {
        return <a href="javascript:;">{`${record.sender_id === user.id ? user.name : this.targets[record.id].name}: ${text}`}</a>
      }
    }, {
      title: '时间',
      dataIndex: 'newest_date',
      render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text, record, index) => {
        return (
          <span>
            <Link onClick={() => {
              if (messages.list.length == 0) {
                dispatch({
                  type: 'chat/getMessages',
                  payload: {
                    chat_room_id: text,
                    pageSize: 5
                  },
                  callback: data => {
                    dispatch({
                      type: 'chat/setMessages',
                      payload: data
                    })
                  }
                })
              }
              this.setState({
                showChatModal: true,
                currentTarget: this.targets[text],
                currentRoomId: text
              })
            }}>查看对话</Link>
            <Link style={{ marginLeft: 10 }} onClick={() => {
              dispatch({
                type: 'notices/delete',
                payload: record.id
              })
            }}>删除</Link>
          </span>
        )
      }
    }];
    return (
      <div>
        <Table
          rowKey={record => record.id}
          rowSelection={rowSelection}
          dataSource={rooms.list}
          columns={columns}
          pagination={rooms.pagination}
        />
        {
          showChatModal ?
            <Room
              data={messages.list}
              pagination={messages.pagination}
              roomId={currentRoomId}
              target={currentTarget}
              onClose={() => this.setState({ showChatModal: false })}
              loading={loading}
              user={user}
              onSend={data => {
                dispatch({
                  type: 'chat/sendMessage',
                  payload: data
                })
              }}
              onLoadMore={(roomId, pagination) => {
                dispatch({
                  type: 'chat/getMessages',
                  payload: {
                    chat_room_id: roomId,
                    ...pagination,
                  },
                  callback: data => {
                    dispatch({
                      type: 'chat/addMessages',
                      payload: data
                    })
                  }
                })
              }}
            /> : ''
        }
      </div>
    )
  }
};

export default Message;