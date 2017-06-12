import React, { Component } from 'react';
import { Input, Icon, Button } from 'antd';
import Message from './Message';
import styles from './Room.css';
import DragBox from '../DragBox';
import { ROOT_PATH, default_picture } from '../../constants';

class Room extends Component {
    static defaultProps = {
        target: {},
        data: [],
        user: {},
        pagination: {},
        roomId: undefined,
        onClose: () => { },
        onLoadMore: () => { },
        loading: false,
    }

    state = {
        inputValue: '',
        hasMessages: true
    }

    componentDidMount() {
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }


    sendMessage = () => {
        const { onSend, roomId, target, user } = this.props;
        const userId = user.id;
        const { inputValue } = this.state;

        onSend({
            receiver_id: target.id,
            sender_id: userId,
            content: inputValue,
            chat_room_id: roomId,
            is_read: false
        });
        this.setState({ inputValue: '' });
    }

    componentWillReceiveProps(nextProps) {
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }

    renderMessages(data, target, user) {
        const list = [];
        for (let i = data.length - 1; i >= 0; i--) {
            list.push(
                <Message message={data[i]} key={i} target={target} user={user}
                    float={data[i].receiver_id !== user.id ? 'right' : 'left'}
                />
            )
        }
        return list;
    }

    onLoadMore = e => {
        const { roomId, onLoadMore, pagination } = this.props;
        const { pageSize, current, total } = pagination;
        if (current * pageSize >= total) {
            this.setState({ hasMessages: false });
            return false;
        }
        onLoadMore(roomId, {
            pageSize,
            current: current + 1,
        });
    }

    render() {
        const { target, onClose, onSend, user, data, roomId, loading } = this.props;
        const { inputValue, hasMessages } = this.state;
        const userId = user.id;
        return (
            <DragBox left={300} top={50} className={styles['container']}>
                <div className={styles['header']}>
                    {target.name}
                    <Icon className={styles['close-icon']} onClick={onClose} type="close-circle-o" />
                </div>
                <div className={styles['load-more']} onClick={this.onLoadMore}>
                    {
                        hasMessages ? '加载更多' : '暂无记录'
                    }
                    {
                        loading ? <Icon type={'loading'} /> : ''
                    }
                </div>
                <div ref={ref => this.chatBody = ref} className={`${styles['body']} scrollbar`}>
                    {
                        this.renderMessages(data, target, user)
                    }
                </div>
                <div className={styles['footer']}>
                    <Input className={'scrollbar'} value={inputValue} onChange={e => {
                        this.setState({ inputValue: e.target.value })
                    }} type="textarea" rows={4} onKeyDown={e => {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            this.sendMessage();
                        }
                    }} />
                    <div className={styles['action']}>
                        <Button onClick={onClose}>关闭</Button>
                        <Button type='primary' onClick={this.sendMessage}>发送</Button>
                    </div>
                </div>
            </DragBox>
        )
    }
}

export default Room;