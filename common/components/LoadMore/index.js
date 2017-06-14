import React, { Component } from 'react';
import { Icon } from 'antd';
import styles from './index.css';

const NEED_UPDATE = 1;
const UPDATING = 2;
const UPDATED = 3;
class LoadMore extends Component {
    static defaultProps = {
        needUpdateLabel: '点击刷新',
        updatingLabel: <div>{'加载中'}<Icon type='loading' /></div>,
        updatedLabel: '加载完成',
        color: '#ccc',
        onLoad: () => { }
    }

    state = {
        hide: false,
        status: NEED_UPDATE,
    }

    componentDidMount() {
        this.loadMore.style.background = this.props.color;
    }

    renderLabel = (needUpdateLabel, updatingLabel, updatedLabel) => {
        switch(this.state.status) {
            case NEED_UPDATE:
                return needUpdateLabel;
            case UPDATING:
                return updatingLabel;
            case UPDATED:
                return updatedLabel;
        }
    }
    
    setHide(cb) {
        const delayHide = setTimeout(() => {
            this.setState({ hide: true })
            // const timer = setTimeout(() => {
            //     this.loadMore.parentNode.removeChild(this.loadMore);
            //     clearTimeout(timer)
            //     cb()
            // }, 500)
            // clearTimeout(delayHide)
            cb()
        }, 1000)
    }

    onClick = () => {
        this.setState({status: UPDATING});
        this.props.onLoad((cb) => {
            this.setState({status: UPDATED})
            this.setHide(cb);
        });
    }

    render() {
        const { className, color, needUpdateLabel, updatingLabel, updatedLabel, ...other } = this.props;
        const { hide } = this.state;
        return (
            <div ref={ref => this.loadMore = ref}
                className={`${styles.container} ${hide && styles['animation-hide']} ${className}`}
                onClick={this.onClick}
            >
                {this.renderLabel(needUpdateLabel, updatingLabel, updatedLabel)}
            </div>
        )
    }
}

export default LoadMore;