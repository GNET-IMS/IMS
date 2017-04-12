import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { Tabs, Calendar, Timeline, Icon, Spin } from 'antd';
const TabPane = Tabs.TabPane;
import Detail from './Detail';
import Feature from './Feature';
import styles from './index.css';

class Personal extends Component {

  onTabChange = (key) => {
    const { dispatch, userId } = this.props;
    switch (key) {
      case '1':
        break;
      case '2':
        break;
      case '3':
        dispatch({type: 'personal/view'})
        break;
    }
  }

  render() {
    const { dispatch, personal, loading } = this.props;
    const { user, disabled } = personal;
    return (
      <div>
        <Feature {...this.props}></Feature>
        <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
          <TabPane tab="活动" key="1">
            <Timeline>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
              <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>
          </TabPane>
          <TabPane tab="日历" key="2">
            <Calendar
              dateCellRender={(date) => 1}
              monthCellRender={(date) => 2}
              onPanelChange={(date, model) => console.log(1)}
              onSelect={(date) => console.log(date)}
            />
          </TabPane>
          <TabPane tab="信息" key="3">
            <Spin spinning={loading}>
              <Detail disabled={disabled} data={user} dispatch={dispatch}></Detail>
            </Spin>
          </TabPane>
        </Tabs>
      </div>
    );
  }
};

export default Personal;
