import React from 'react';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import styles from './index.css';

class Header extends React.Component {
  state = {
    current: 'account',
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div className={styles['header']}>
        <Menu
          onClick={this.handleClick}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          className={styles['header-right']}
        >
          <SubMenu key="/message" title={<Icon style={{color:"rgb(189, 189, 189)"}} type="mail" />}>
            <Menu.Item key="/message">
                <Link to="/message">消息</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="/logout" title={<Icon style={{color:"rgb(189, 189, 189)"}} type="user" />}>
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