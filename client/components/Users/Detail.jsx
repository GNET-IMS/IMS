import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Form, Row, Col, Input, Button, Select, Switch, Radio, DatePicker } from 'antd';
import { routerRedux } from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Detail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { users, form, dispatch, type, onSubmit, ...rest } = this.props;
    const { getFieldDecorator, getFieldError, isFieldValidating, setFieldsValue } = form;
    const { current } = users;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    return (
      <div>
        <Form layout="horizontal">
          <h3>基本信息设置</h3>
          <br />
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="姓名"
                hasFeedback
                help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
              >
                {getFieldDecorator('name', {
                  rules: [
                    { required: true, message: '姓名不得为空' }
                  ]
                })(
                  <Input />
                  )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="是否为管理员"
                hasFeedback
                help={isFieldValidating('is_admin') ? '校验中...' : (getFieldError('is_admin') || []).join(', ')}
              >
                {getFieldDecorator('is_admin', {
                  rules: [
                    { required: true, message: '是否为管理员必须选择' }
                  ]
                })(
                  <Switch defaultChecked={current.is_admin} checkedChildren="是" unCheckedChildren="否" />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="用户名"
                hasFeedback
                help={isFieldValidating('username') ? '校验中...' : (getFieldError('username') || []).join(', ')}
              >
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: '用户名不得为空' }
                  ]
                })(
                  <Input />
                  )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="密码"
                hasFeedback
                help={isFieldValidating('password') ? '校验中...' : (getFieldError('password') || []).join(', ')}
              >
                {getFieldDecorator('password', {
                  rules: [
                    { required: this.props.type === 'edit' ? false : true, message: '密码不得为空' }
                  ]
                })(
                  <Input placeholder="输入新密码，保存后可以修改密码" />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="性别"
                hasFeedback
                help={isFieldValidating('sex') ? '校验中...' : (getFieldError('sex') || []).join(', ')}
              >
                {getFieldDecorator('sex', {
                  initialValie: '0',
                  rules: [
                    { required: true, message: '性别不得为空' }
                  ]
                })(
                  <RadioGroup>
                    <RadioButton value={0}>男</RadioButton>
                    <RadioButton value={1}>女</RadioButton>
                  </RadioGroup>
                  )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="邮箱"
                hasFeedback
                help={isFieldValidating('email') ? '校验中...' : (getFieldError('email') || []).join(', ')}
              >
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: '邮箱不得为空' }
                  ]
                })(
                  <Input />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="部门"
                hasFeedback
                help={isFieldValidating('department') ? '校验中...' : (getFieldError('department') || []).join(', ')}
              >
                {getFieldDecorator('department', {
                  rules: [
                    { required: true, message: '部门不得为空' }
                  ]
                })(
                  <Input />
                  )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="职位"
                hasFeedback
                help={isFieldValidating('title') ? '校验中...' : (getFieldError('title') || []).join(', ')}
              >
                {getFieldDecorator('title', {
                  rules: [
                    { required: false }
                  ]
                })(
                  <Input />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="生日"
                hasFeedback
                help={isFieldValidating('birthday') ? '校验中...' : (getFieldError('birthday') || []).join(', ')}
              >
                {getFieldDecorator('birthday', {
                  initialValie: moment(),
                  rules: [
                    { required: false }
                  ]
                })(
                  <DatePicker format="YYYY-MM-DD" onChange={(date, dateString) => {
                    form.setFieldsValue({
                      ['birthday']: moment(dateString).format('YYYY-MM-DD'),
                    })
                  }} />
                  )}
              </FormItem>
            </Col>
            <Col span={12}>

            </Col>
          </Row>

          <br />
          <FormItem>
            <Row>
              <Col span={3} offset={8}>
                <Button type="primary" htmlType="submit" size="large"
                  onClick={(e) => onSubmit(e, form)}
                >{type === "edit" ? "保存" : "新增"}</Button>
              </Col>
              <Col span={3}>
                <Button size="large" type="ghost" onClick={() => dispatch(routerRedux.goBack())}>取消</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    );
  }
};

Detail.propTypes = {
  mapPropsToFields: PropTypes.func.isRequired,
};
Detail.defaultProps = {
  mapPropsToFields: () => ({}),
}
export default Form.create({
  mapPropsToFields: (props) => {
    const type = props.type;
    const user = props.users.current;
    if (type == "add") {
      return {
        password: {
          value: '1234'
        },
        is_admin: {
          value: false,
        },
        sex: {
          value: 0,
        },
      }
    } else {
      return {
        name: {
          value: user.name,
        },
        is_admin: {
          value: user.is_admin ? true : false,
        },
        username: {
          value: user.username,
        },
        birthday: {
          value: moment(user.birthday)
        },
        sex: {
          value: user.sex ? +`${user.sex}` : 0,
        },
        email: {
          value: user.email,
        },
        department: {
          value: user.department,
        },
        title: {
          value: user.title,
        }
      }
    }


  }
})(Detail);