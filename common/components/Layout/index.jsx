import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import GuideMenu from '../GuideMenu';
import Header from '../Header';

import styles from './index.css';

class Layout extends React.Component {

	itemRender = (route, params, routes, paths) => {
		const last = routes.indexOf(route) === routes.length - 1;
    if (!route.path) return false;
  	return last ? <span key={route.path}>{route.breadcrumbName}</span> : <Link key={route.path} to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>;
	}
  render() {
    const { children, routes, params, userId } = this.props;
    return (
      <div className={styles['layout']}>
        <GuideMenu></GuideMenu>
        <div className={styles['layout-right']}>
            <Header userId={userId}/>
            <div className={styles['layout-main']}>
              <div className={styles['layout-breadcrumb']}>
                <Breadcrumb separator=">" routes={routes.filter(item => !!item.path)} params={params} itemRender={this.itemRender}/>
              </div>
              <div className={styles['layout-content']}>{children}</div>
            </div>
        </div>
      </div>
    );
  }
}

export default Layout;