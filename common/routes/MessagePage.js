import React, { Component } from 'react';
import { Button, Input, Row, Col, Form, Menu, Icon, Tabs, Tooltip } from 'antd';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import Message from '../components/Message';

import selector from '../models/message/selector';

import styles from './MessagePage.css';

const FormItem = Form.Item;
const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const MessagePage = ({message, dispatch}) => {

    return (
        <div className={styles['box']}>
            <Tabs type="card" tabBarExtraContent={<Tooltip placement="top" title="清空"><Icon type="delete" style={{marginRight:20, fontSize:20}} /></Tooltip>}>
              <TabPane tab="系统消息" key="1">
                <Message dispatch={dispatch} message={message}/>
              </TabPane>
              <TabPane tab="好友消息" key="2">
                <Message dispatch={dispatch} message={message}/>
              </TabPane>
              <TabPane tab="其他消息" key="3">
                <Message dispatch={dispatch} message={message}/>
              </TabPane>
            </Tabs>
        </div>    
    );

}

const message = connect(selector)(MessagePage);

export {
  message as default,
}