import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';

import styles from './Message.css';
import { ROOT_PATH } from '../../constants';

class Message extends Component {

    static defaultProps = {
        message: {},
        float: 'right',
        userId: undefined,
        target: {},
    }

    renderStatus = status => {
        switch (status) {
            case 'sending':
                return <Icon className={styles['chat-status']} type="loading" />
            case 'success':
                return ''
            case 'fail':
                return <font color="red"><Icon className={styles['chat-status']} type="close" /></font>
            default:
                return ''
        }
    }

    renderRightMessage(message, user) {
        return (
            <Row className={styles['chat-message-right']} type="flex" align="top" justify="end">
                <Col className={styles['chat-message-text']} span={20}>
                    <div className={styles['chat-message-text-group']}>
                        {this.renderStatus(message.status)}
                        <span>{message.content}</span>
                    </div>
                </Col>
                <Col className={styles['chat-message-photo']} span={1}>
                    <img src={`${ROOT_PATH}${user.avatar_url}` || '/src/assets/images/chh4.jpg'} alt="暂无头像" />
                </Col>
            </Row>
        )
    }

    renderLeftMessage(message, user) {
        return (
            <Row className={styles['chat-message-left']} type="flex" align="top" justify="start">
                <Col className={styles['chat-message-photo']} span={1}>
                    <img src={`${ROOT_PATH}${user.avatar_url}` || '/src/assets/images/chh4.jpg'} alt="暂无头像" />
                </Col>
                <Col className={styles['chat-message-text']} span={20}>
                    <div className={styles['chat-message-text-group']}>
                        <span>{message.content}</span>
                    </div>
                </Col>
            </Row>
        )
    }

    render() {
        const { message, float, target, user } = this.props;
        const renderMessage = float === 'right'
            ? this.renderRightMessage(message, user)
            : this.renderLeftMessage(message, target);
        return renderMessage;
    }
}

export default Message;