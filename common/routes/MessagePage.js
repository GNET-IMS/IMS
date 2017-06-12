import React, { Component } from 'react';
import { Button, Input, Row, Col, Form, Menu, Icon, Tabs, Tooltip, Spin } from 'antd';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import Announcement from '../components/Announcement';
import Message from '../components/Chat';

import selector from '../models/notices/selector';

import styles from './MessagePage.css';

const FormItem = Form.Item;
const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
class MessagePage extends Component {

  onChange = activeKey => {
    const { dispatch } = this.props;
    switch (activeKey) {
      case '1':
        dispatch({
          type: 'announcements/getAnnouncements'
        })
        break;
      case '2':
        dispatch({
          type: 'chat/getRooms'
        })
        break;
      case '3':
        dispatch({
          type: 'notices/getReminders'
        })
        break;
    }
  }

  renderTabBarExtraContent = () => {
    const { dispatch } = this.props;
    return (
      <div>
        <Tooltip placement="top" title="清空"><Icon type="delete" style={{ marginRight: 20, fontSize: 20 }} /></Tooltip>
        <Tooltip placement="top" title="加载"><Icon type="reload" style={{ marginRight: 20, fontSize: 20 }} onClick={() => {
          dispatch({
            type: 'announcements/getAnnouncements'
          })
        }} /></Tooltip>
      </div>
    )
  }

  render() {
    const { notices, dispatch, loading, userId, chat, messagesLoading, user, announcements, announcementsLoadind } = this.props;
    return (
      <div className={styles['box']}>
        <Tabs type="card" animated={false} onChange={this.onChange} tabBarExtraContent={this.renderTabBarExtraContent()}>
          <TabPane tab="公告" key="1">
            <Spin spinning={announcementsLoadind}>
              <Announcement dispatch={dispatch} announcements={announcements} user={user} userId={userId} loading={announcementsLoadind} />
            </Spin>
          </TabPane>
          <TabPane tab="私信" key="2">
            <Spin spinning={false}>
              <Message dispatch={dispatch} userId={userId} chat={chat} user={user} loading={messagesLoading} />
            </Spin>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const message = connect(selector)(MessagePage);

export {
  message as default,
}