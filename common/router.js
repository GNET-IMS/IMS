import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';


import IndexPage from './routes/IndexPage';

import LoginPage from './routes/LoginPage';
import HomePage from './routes/HomePage';
import PersonalPage from './routes/PersonalPage';
import UsersPage, { UserEdit, UserView, UserAdd, UserBatchAdd } from './routes/UsersPage';
import MessagePage from './routes/MessagePage';
import AnnouncementPage from './routes/AnnouncementPage';
import ChatPage from './routes/ChatPage';


export const routes = (
  <div>
    <Route path="/" breadcrumbName="首页">
      <Route path="authorize" component={LoginPage} />
      <Route component={IndexPage}>
        <IndexRoute component={HomePage} />
        <Route path="message" breadcrumbName="消息" component={MessagePage} />
        <Route path="announcement" breadcrumbName="公告" component={AnnouncementPage} />
        <Route path="chat" breadcrumbName="私信" component={ChatPage} />
        <Route path="user" breadcrumbName="用户">
          <Route path="list" breadcrumbName="列表">
            <IndexRoute component={UsersPage} />
            <Route path="edit/:id" breadcrumbName="编辑" component={UserEdit} />
            <Route path="view/:id" breadcrumbName="查看" component={UserView} />
            <Route path="add" breadcrumbName="添加" component={UserAdd} />
            <Route path="batchadd" breadcrumbName="批量添加" component={UserBatchAdd} />
          </Route>
        </Route>
        <Route path="personal" breadcrumbName="个人信息" component={PersonalPage} />
      </Route>
    </Route>
  </div>
);

export default function ({ history }) {
  return (
    <Router history={history}>
      {routes}
    </Router>
  );
}
