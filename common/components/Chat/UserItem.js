import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import TooltipIcon from '../TooltipIcon';
import styles from './UserItem.css';
import { ROOT_PATH, default_picture } from '../../constants';

class UserItem extends Component {
    static defaultProps = {
        data: {

        }
    }
    constructor(props) {
        super(props);
    }

    render() {
        const { data, onConversation, ...other } = this.props;
        return (
            <div className={styles['container']} {...other}>
                <img src={`${ROOT_PATH}${data.photo || default_picture}`} alt="" />
                <div className={styles['info']}>
                    <div className={styles['name']}>
                        <font title={data.name}>{data.name}</font>
                        <Icon className={data.sex ? styles['man'] : styles['woman']} type={data.sex ? 'man' : 'woman'} />
                    </div>
                    <div className={styles['action']}>
                        <TooltipIcon type='message' title='私聊' onClick={onConversation} />
                        <TooltipIcon type='user-delete' title='删除' />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserItem;