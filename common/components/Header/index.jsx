import React from 'react';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import styles from './index.css';
import Hint from '../Notice/Hint';

class Header extends React.Component {
  state = {
    current: '/message',
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  render() {
    const { user, unreadNum, dispatch } = this.props;
    return (
      <div className={styles['header']}>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          className={styles['header-left']}
        >
          <SubMenu key="/message" title={<Icon type="menu-fold" />}>
          </SubMenu>
        </Menu>

        <Menu
          onClick={this.handleClick}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          className={styles['header-right']}
        >
          <SubMenu key="/announcement" title={<Link to="/announcement"><Icon type="mail" /></Link>}></SubMenu>
          <SubMenu key="/chat" title={<Link to="/chat"><Icon type="message" /></Link>} />
          <SubMenu key="/user" title={<Link to="/personal"><img className={styles['photo']} src={user.avatar_url} alt="暂无头像"/></Link>}>
            <Menu.Item key="/user">用户名</Menu.Item>
            <Menu.Item key="/personal">
                <Link to="/personal">个人信息</Link>
            </Menu.Item>
            <Menu.Item key="/logout">
                <Link to="/logout">注销</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default Header;
