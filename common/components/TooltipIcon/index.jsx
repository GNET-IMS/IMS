import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import styles from './index.css';

class TooltipIcon extends Component {

    static defaultProps = {
        className: '',
        type: '',
        onClick: () => { },
        title: undefined,
        onTitleClick: () => { },
        href: undefined,
        download: undefined,
        placement: "top",
    }
    constructor(props) {
        super(props);

    }
    componentDidMount() {

    }
    renderIcon = () => {
        const { className, type, onClick, children } = this.props;
        const target = type ?
            <Icon className={className} onClick={onClick} type={type} />
            :
            children;
        return target;
    }
    render() {
        const { title, onTitleClick, href, download, placement } = this.props;
        const target = this.renderIcon();
        return (
            <div className={styles['container']}>
                <Tooltip title={title} onClick={onTitleClick} placement={placement}>
                    {
                        href ?
                            <a href={href} download={download}>{target}</a>
                            :
                            target
                    }
                </Tooltip>
            </div>
        )
    }
}

export default TooltipIcon;