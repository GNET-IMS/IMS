import { Menu, Icon, Switch } from 'antd';
import { Link } from 'dva/router';
const SubMenu = Menu.SubMenu;
import styles from './index.css';

class GuideMenu extends React.Component {
  state = {
    theme: 'dark',
    current: 'account',
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div className={styles['guideMenu']}>
        <div className={styles['logo']}>
            <img src="./images/favicon.ico" alt=""/>
        </div>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
          className={styles['menu']}
        >
          <SubMenu key="/account/list" title={<span><Icon type="mail" /><span>账号信息</span></span>}>
            <Menu.Item key="/account/list">
                <Link to="/account/list">账号管理</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default GuideMenu;