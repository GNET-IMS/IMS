import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';

import HomePage from './routes/HomePage';
import AccountPage, {AccountEdit, AccountView, AccountAdd, AccountBatchAdd} from './routes/AccountPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" breadcrumbName="首页" component={IndexPage}>
        <IndexRoute component={HomePage} />
        <Route path="account" breadcrumbName="账号">
          <Route path="list" breadcrumbName="列表">
            <IndexRoute component={AccountPage}/>
            <Route path="edit/:id" breadcrumbName="编辑" component={AccountEdit}/>
            <Route path="view/:id" breadcrumbName="查看" component={AccountView}/>
            <Route path="add/:id" breadcrumbName="添加" component={AccountAdd}/>
            <Route path="batchadd/:id" breadcrumbName="批量添加" component={AccountBatchAdd}/>
          </Route>
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
