import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Icon, notification } from 'antd';
import io from 'socket.io-client';
import { ROOT_PATH } from '../../constants';

class Hint extends Component {
    componentDidMount() {
        const { userId } = this.props;
        const socket = io.connect(`${ROOT_PATH}`);
        socket.on('connect', () => {
            console.log('connect!');
            socket.emit('init', userId);
        });

        socket.on('disconnect', () => {
            console.log('disconnect!');
        });

        socket.on('error', (e) => {
            console.log('error!', e);
        });

        socket.on('res', result => {
            notification[result.type]({
                message: result.title,
                description: result.content
            });
        });
    }

    render() {
        return (
            <Link to="/message"><Icon type="mail" /></Link>
        )
    }
}

export default Hint;