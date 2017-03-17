import React, { Component } from 'react';
import { Table, Pagination } from 'antd';

import styles from './index.css';

class BaseTable extends Component {
  static defaultProps = {
    defaultOnChangeCallback: () => {}
  }
  render() {
    const { pagination, defaultOnChangeCallback, onChange, ...others, } = this.props;
    const onTableChange = (pagination, filters, sorter) => {
      let query = {}
      query.pagination = {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
      if (sorter.order) {
        const order = sorter.order;
        query.sorter = {
          [sorter.field]: order.substr(0, order.length - 3)
        }
      }
      defaultOnChangeCallback(query);
    }
    return (
      <div>
        <Table
          {...others}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            showTotal: total => `共 ${total} 条`,
            showQuickJumper: true,
            ...pagination
          }}
          onChange={onChange || onTableChange}
        />
      </div>

    );
  }
};

BaseTable.propTypes = {
};

export default BaseTable;
