import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Icon, notification, Badge } from 'antd';
import io from 'socket.io-client';
import { ROOT_PATH } from '../../constants';

class Hint extends Component {

    static defaultProps = {
        unreadNum: 0
    }

    componentDidMount() {
        const { userId, dispatch } = this.props;
        this.socket = io.connect(`${ROOT_PATH}`);
        this.socket.on('connect', () => {
            console.log('connect!');
            userId ? this.socket.emit('init', userId) : '';
            dispatch({
                type: 'auth/setSocket',
                payload: this.socket
            })
        });

        this.socket.on('disconnect', () => {
            console.log('disconnect!');
        });

        this.socket.on('error', (e) => {
            console.log('error!', e);
        });

        this.socket.on('message_response', result => {
            dispatch({
                type: 'auth/getUnreadNum'
            })
            notification[result.type]({
                message: result.title,
                description: result.content
            });
        });

        this.socket.on('chat_response', result => {
            dispatch({
                type: 'chat/receiveMessage',
                payload: result
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userId !== this.props.userId) {
            this.socket.emit('init', nextProps.userId);
        }
    }
    

    render() {
        const { unreadNum } = this.props;
        return (
            <Badge count={unreadNum}>
                <Link to="/message"><Icon type="mail" /></Link>
            </Badge>
        )
    }
}

export default Hint;