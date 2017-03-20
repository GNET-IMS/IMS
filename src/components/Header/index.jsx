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
          <SubMenu key="/message" title={<Link to="/message"><Icon style={{color:"rgb(189, 189, 189)"}} type="mail" /></Link>}></SubMenu>
          <SubMenu key="/logout" title={<Link to="/personal"><img className={styles['photo']} src="/images/chh1.jpg" alt="暂无头像"/></Link>}>
            <Menu.Item key="/user">用户名</Menu.Item>
            <Menu.Item key="/owern">个人信息</Menu.Item>
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