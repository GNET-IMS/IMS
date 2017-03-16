import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';

import HomePage from './routes/HomePage';
import UsersPage, {UserEdit, UserView, UserAdd, UserBatchAdd} from './routes/UsersPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" breadcrumbName="首页" component={IndexPage}>
        <IndexRoute component={HomePage} />
        <Route path="user" breadcrumbName="用户">
          <Route path="list" breadcrumbName="列表">
            <IndexRoute component={UsersPage}/>
            <Route path="edit/:id" breadcrumbName="编辑" component={UserEdit}/>
            <Route path="view/:id" breadcrumbName="查看" component={UserView}/>            
            <Route path="add" breadcrumbName="添加" component={UserAdd}/>
            <Route path="batchadd" breadcrumbName="批量添加" component={UserBatchAdd}/>
          </Route>
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
