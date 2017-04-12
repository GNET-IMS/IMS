import React, { Component } from 'react';
import moment from 'moment';
import { Form, Input, DatePicker, Row, Col, Icon, Button, Radio } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

import styles from './index.css';

class Detail extends Component {

	static defaultProps = {
		disabled: true,
	}

	onSubmit = (e, form) => {
		const { dispatch, data } = this.props;
		e.preventDefault();

		form.validateFieldsAndScroll((errors, values) => {
			if (!!errors) {
				return;
			}

			let formData = form.getFieldsValue();
			formData._id = data._id;
			if (!formData.password) delete formData.password;
			dispatch({
				type: 'personal/edit',
				payload: formData,
			})
		});
	}

	render() {
		const { form, data, disabled, dispatch } = this.props;
		const { getFieldDecorator, getFieldError, isFieldValidating, setFieldsValue } = form;
		const formItemLayout = {
			labelCol: { span: 7 },
			wrapperCol: { span: 10 },
		};
		return (
			<div>
				<Form layout="horizontal">
					<Row>
						<Col span={12}>
							<FormItem
								{...formItemLayout}
								label="姓名"
								hasFeedback={disabled ? false : true}
							>
								{
									disabled ? <p>{data.name}</p> : getFieldDecorator('name', {
										initialValue: data.name,
										rules: [
											{ required: disabled ? false : true, message: '姓名不得为空' }
										],
									})(
										<Input />
										)
								}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem
								{...formItemLayout}
								label="用户名"
								hasFeedback={disabled ? false : true}
							>
								{
									disabled ? <p>{data.username}</p> : getFieldDecorator('username', {
										initialValue: data.username,
										rules: [
											{ required: disabled ? false : true, message: '用户名不得为空' }
										]
									})(
										<Input />
										)
								}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<FormItem
								{...formItemLayout}
								label="密码"
								hasFeedback={disabled ? false : true}
							>
								{
									disabled ? <p>******</p> : getFieldDecorator('password', {
										rules: [
											{ required: false, message: '密码不得为空' }
										]
									})(
										<Input placeholder="输入新密码，保存后可以修改密码" />
										)
								}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem
								{...formItemLayout}
								label="邮箱"
								hasFeedback={disabled ? false : true}
							>
								{
									disabled ? <p>{data.email}</p> : getFieldDecorator('email', {
										initialValue: data.email,
										rules: [
											{ required: disabled ? false : true, message: '邮箱不得为空' }
										]
									})(
										<Input />
										)
								}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<FormItem
								{...formItemLayout}
								label="性别"
								hasFeedback={disabled ? false : true}
							>
								{
									disabled ? <p>{data.sex ? '女' : '男'}</p> : getFieldDecorator('sex', {
										initialValue: +data.sex,
										rules: [
											{ required: disabled ? false : true, message: '性别不得为空' }
										]
									})(

										<RadioGroup>
											<RadioButton value={0}>男</RadioButton>
											<RadioButton value={1}>女</RadioButton>
										</RadioGroup>
										)
								}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem
								{...formItemLayout}
								label="生日"
								hasFeedback={disabled ? false : true}
							>
								{
									disabled ? <p>{moment(data.birthday).format('YYYY-MM-DD')}</p> : getFieldDecorator('birthday', {
										initialValue: moment(data.birthday),
										rules: [
											{ required: false }
										]
									})(

										<DatePicker format="YYYY-MM-DD" onChange={(date, dateString) => {
											form.setFieldsValue({
												['birthday']: moment(dateString).format('YYYY-MM-DD'),
											})
										}} />
										)
								}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<FormItem
								{...formItemLayout}
								label="部门"
								hasFeedback={disabled ? false : true}
							>
								{
									disabled ? <p>{data.department}</p> : getFieldDecorator('department', {
										initialValue: data.department,
										rules: [
											{ required: disabled ? false : true, message: '部门不得为空' }
										]
									})(

										<Input />
										)
								}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem
								{...formItemLayout}
								label="职位"
								hasFeedback={disabled ? false : true}
							>
								{
									disabled ? <p>{data.title}</p> : getFieldDecorator('title', {
										initialValue: data.title,
										rules: [
											{ required: false }
										]
									})(

										<Input />
										)
								}
							</FormItem>
						</Col>
					</Row>
					<br />
					<FormItem>
						<Row>
							<Col span={3} offset={8}>
								{
									disabled ?
										<Button type="primary" htmlType="submit" size="large"
											onClick={() => dispatch({ type: 'personal/enable' })}
										>编辑</Button>
										:
										<Button type="primary" htmlType="submit" size="large"
											onClick={(e) => this.onSubmit(e, form)}
										>保存</Button>
								}
							</Col>
							<Col span={3}>
								{
									disabled ?
										''
										:
										<Button size="large" type="ghost" onClick={() => dispatch({ type: 'personal/disable' })}>取消</Button>
								}
							</Col>
						</Row>
					</FormItem>
				</Form>
			</div>
		);
	}
};

export default Form.create()(Detail);
