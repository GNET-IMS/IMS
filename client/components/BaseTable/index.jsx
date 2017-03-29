import React, { Component } from 'react';
import { Table, Pagination } from 'antd';

import styles from './index.css';

class BaseTable extends Component {
  static defaultProps = {
    defaultOnChangeCallback: () => {}
  }

  onTableChange = (pagination, filters, sorter) => {
    const { onChange, defaultOnChangeCallback } = this.props;
    let query = {}
      query.current = pagination.current;
      query.pageSize = pagination.pageSize;
      if (sorter.order) {
        const order = sorter.order;
        query.sorter = sorter.field;
        query.order = order.substr(0, order.length - 3);
      }
      defaultOnChangeCallback(query);
      if (onChange && 'function' === typeof onChange) onChange();
  }

  render() {
    const { pagination, ...others, } = this.props;

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
          onChange={this.onTableChange}
        />
      </div>

    );
  }
};

BaseTable.propTypes = {
};

export default BaseTable;
