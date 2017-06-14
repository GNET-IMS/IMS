import { Form, Modal, Button, Input, Checkbox, Row, Col } from 'antd';
import React from 'react';
const FormItem = Form.Item;

class AddModal extends React.Component {
	state = { visible: false }
	showModal = () => {
		this.setState({
			visible: true,
		});
	}
	handleOk = (e) => {
		const { dispatch, form } = this.props;
		const { validateFieldsAndScroll } = form;
		validateFieldsAndScroll((errors, values) => {
			dispatch({
				type: 'announcements/save',
				payload: values
			})
			this.setState({
				visible: false,
			});
		})
	}
	handleCancel = (e) => {
		this.setState({
			visible: false,
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 14 },
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 14,
					offset: 6,
				},
			},
		};
		return (
			<div>
				<Button type="primary" onClick={this.showModal}>发布公告</Button>
				<Modal
					title="发布公告"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Form onSubmit={this.handleSubmit}>
						<FormItem
							{...formItemLayout}
							label="内容"
						>
							{getFieldDecorator('content', {
								rules: [{ required: true, message: '请输入公告内容' }],
							})(
								<Input type='textarea' rows={6} />
								)}
						</FormItem>
						<FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
							{getFieldDecorator('receiver_ids', {
								valuePropName: '0',
							})(
								<Checkbox>全部人</Checkbox>
								)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default Form.create()(AddModal);