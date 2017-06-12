import React, { Component } from 'react';
import { Pagination } from 'antd';
import styles from './index.css';

class BasePagination extends Component {
    static defaultProps = {
        defaultOnChangeCallback: () => { },
        beforeOnChange: () => true,
        afterOnChange: () => true,
        show: true,
    }

    onChange = (page, pageSize) => {
        const { onChange, defaultOnChangeCallback, afterOnChange, beforeOnChange } = this.props;
        if (beforeOnChange()) {
            let query = {}
            query.current = page;
            query.pageSize = pageSize;
            defaultOnChangeCallback(query);
            if (onChange && 'function' === typeof onChange) onChange();
            afterOnChange();
        }
    }

    render() {
        const { pagination, children, show } = this.props;
        const page = {
            defaultCurrent: 1,
            pageSize: 10,
            total: 0,
            onChange: this.onChange,
            ...pagination
        }
        return (
            <div>
                {children}
                {
                    show ?
                        <div className={styles['pagination']}>
                            <Pagination {...page} />
                        </div>
                        :
                        ''
                }
            </div>
        )
    }
}

export default BasePagination;