import React, { Component } from 'react';
import styles from './index.css';


class DragBox extends Component {
    static defaultProps = {
        left: 0,
        top: 0,
    }

    constructor(props) {
        super(props);
        this.down = false;
    }

    componentDidMount() {
        const { left, top } = this.props;
        this.dragBox.style.left = isNaN(left) ? left : left + 'px';
        this.dragBox.style.top = isNaN(top) ? top : top + 'px';
    }
    

    onMouseDown = e => {
        this.down = true;
        const { x, y } = this.mousePosition(e);
        this.setStartingPosition(x, y);
        this.originCursor = this.dragBox.style.cursor;
        this.dragBox.style.cursor = 'pointer';
    }

    onMouseUp = e => {
        this.down = false;
        this.dragBox.style.cursor = this.originCursor;
    }

    onMouseMove = e => {
        if (!this.down) return false;
        const { x, y } = this.mousePosition(e);
        const offsetX = x - this.startingX;
        const offsetY = y - this.startingY;
        this.setStartingPosition(x, y);
        this.setDragBoxPosition(offsetX, offsetY);
    }

    setDragBoxPosition = (offsetX, offsetY) => {
        this.dragBox.style.left = +this.dragBox.style.left.split('px')[0] + offsetX + 'px';
        this.dragBox.style.top = +this.dragBox.style.top.split('px')[0] + offsetY + 'px';
    }

    setStartingPosition = (x, y) => {
        this.startingX = x;
        this.startingY = y;
    }

    mousePosition = e => {
        if (!e) e = window.event;
        if (e.pageX || e.pageY) {
            return { x: e.pageX, y: e.pageY };
        }
        return {
            x: e.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
            y: e.clientY + document.documentElement.scrollTop - document.body.clientTop
        };
    }

    render() {
        const { children, className, left, top,  ...other } = this.props;
        return (
            <div
                ref={ref => this.dragBox = ref}
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}
                className={`${styles['draggable']} ${className}`}
                {...other}
            >
                {children}
            </div>
        )
    }
}

export default DragBox;