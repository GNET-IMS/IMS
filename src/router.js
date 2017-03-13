import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';

import HomePage from './routes/HomePage';
import AccountPage, {AccountEdit, AccountAdd} from './routes/AccountPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" breadcrumbName="首页" component={IndexPage}>
        <IndexRoute component={HomePage} />
        <Route path="account" breadcrumbName="账号">
          <Route path="list" breadcrumbName="列表">
            <IndexRoute component={AccountPage}/>
            <Route path="edit/:id" breadcrumbName="编辑" component={AccountEdit}/>
            <Route path="add/:id" breadcrumbName="添加" component={AccountAdd}/>
          </Route>
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
