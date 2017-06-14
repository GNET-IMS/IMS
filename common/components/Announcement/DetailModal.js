import { Form, Modal, Button, Input, Checkbox, Row, Col } from 'antd';
import React from 'react';
const FormItem = Form.Item;

class DetailModal extends React.Component {
	static defaultProps = {
		visible: false,
		current: {},
		onOk: () => { },
		onCancel: () => { }
	}
	render() {
		const { visible, onOk, onCancel, current } = this.props;

		return (
			<div>
				<Modal
					title="公告"
					visible={visible}
					onOk={onOk}
					onCancel={onCancel}
				>
					{current.content}
				</Modal>
			</div>
		);
	}
}

export default DetailModal;