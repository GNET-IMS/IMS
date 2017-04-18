import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Select, Switch } from 'antd';
import pinyin from 'pinyin';
import { routerRedux } from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;

class BatchAdd extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { form, dispatch } = this.props;
    const { getFieldProps, getFieldError, isFieldValidating, getFieldDecorator, setFieldsValue } = form;

    const formItemLayout = {
      wrapperCol: { span: 20 },
    };
    const children = [];
    const onSubmit = (e, form) => {
      e.preventDefault();

      const formData = form.getFieldsValue();
      let users = new Array(5);
      let needValidateFields = [];
      for (let key in formData) {
        let keyName = key.split('_');
        if (!users[keyName[1]]) users[keyName[1]] = {};
        users[keyName[1]][keyName[0]] = formData[key];
      }
      const target = users.filter((item, indxe) => {
        return item.username;
      })

      target.map((item, index) => {
        for (let name in item) {
          needValidateFields.push(`${name}_${index}`);
        }
      }) 

      form.validateFields(needValidateFields, (errors, values) => {
        if (!!errors) {
          return;
        }
        dispatch({
          type: 'users/add',
          payload: target,
        })

      })

    };
    for (let i = 0; i < 5; i++) {
      children.push(
        <Row key={i}>
          <Col offset={2} span={5}>
            <FormItem
              {...formItemLayout}
              hasFeedback
              help={isFieldValidating(`name_${i}`) ? '校验中...' : (getFieldError(`name_${i}`) || []).join(', ')}
            >
              {getFieldDecorator(`name_${i}`, {
                rules: [
                  { required: true, message: '姓名不得为空' }
                ],
              })(
                <Input onBlur={(e) => {
                  const value = e.target.value;
                  const pinyinArray = pinyin(value, {
                    style: pinyin.STYLE_NORMAL,
                  })
                  let pinyinStr = '';
                  for (let array of pinyinArray) {
                    pinyinStr += array[0];
                  }
                  setFieldsValue({ [`username_${i}`]: pinyinStr })
                }} />
                )}
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem
              {...formItemLayout}
              hasFeedback
              help={isFieldValidating(`username_${i}`) ? '校验中...' : (getFieldError(`username_${i}`) || []).join(', ')}
            >
              {getFieldDecorator(`username_${i}`, {
                rules: [
                  { required: true, message: '用户名不得为空' },
                  { min: 4, message: '用户名不得少于4个字符'}
                ],
              })(
                <Input />
                )}
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem
              {...formItemLayout}
              hasFeedback
              help={isFieldValidating(`password_${i}`) ? '校验中...' : (getFieldError(`password_${i}`) || []).join(', ')}
            >
              {getFieldDecorator(`password_${i}`, {
                initialValue: '1234',
                rules: [
                  { required: true, min: 4, max: 16, message: '密码不得为空' },
                  { min: 4, message: '密码不得少于4个字符，大于16个字符'}
                ],
              })(
                <Input />
                )}
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem
              {...formItemLayout}
              hasFeedback
              help={isFieldValidating(`department_${i}`) ? '校验中...' : (getFieldError(`department_${i}`) || []).join(', ')}
            >
              {getFieldDecorator(`department_${i}`, {
                rules: [
                  { required: true, message: '部门不得为空' }
                ],
              })(
                <Input />
                )}
            </FormItem>
          </Col>
        </Row>
      );
    }
    return (
      <div>
        <Form layout="vertical">
          <h3>基本信息设置</h3>
          <br />
          <Row type="flex" justify="end">
            <Col span={5}>
              <FormItem label="姓名"></FormItem>
            </Col>
            <Col span={5}>
              <FormItem label="用户名"></FormItem>
            </Col>
            <Col span={5}>
              <FormItem label="密码"></FormItem>
            </Col>
            <Col span={5}>
              <FormItem label="部门"></FormItem>
            </Col>
          </Row>
          {children.slice(0, 5)}
          <FormItem>
            <Row>
              <Col span={3} offset={8}>
                <Button type="primary" htmlType="submit" size="large"
                  onClick={(e) => onSubmit(e, form)}
                >批量新增</Button>
              </Col>
              <Col span={3}>
                <Button size="large" onClick={() => dispatch(routerRedux.goBack())}>取消</Button>
              </Col>
            </Row>
          </FormItem>

        </Form>
      </div>
    );
  }
};

BatchAdd.defaultProps = {
  mapPropsToFields: () => ({}),
}

export default Form.create()(BatchAdd);