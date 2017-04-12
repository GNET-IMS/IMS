import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import App from './routes/App';
import About from './routes/About';


import IndexPage from './routes/IndexPage';

import LoginPage from './routes/LoginPage';
import HomePage from './routes/HomePage';
import PersonalPage from './routes/PersonalPage';
import UsersPage, { UserEdit, UserView, UserAdd, UserBatchAdd } from './routes/UsersPage';
import MessagePage from './routes/MessagePage';


export const routes = (
  <div>
    <Route path="/" breadcrumbName="首页">
      <Route path="authorize" component={LoginPage} />
      <Route component={IndexPage}>
        <IndexRoute component={HomePage} />
        <Route path="message" breadcrumbName="消息" component={MessagePage} />
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
