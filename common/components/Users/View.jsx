import React, { Component } from 'react';
import moment from 'moment';
import { Form, Row, Col,Button } from 'antd';
import { routerRedux } from 'dva/router';


const FormItem = Form.Item;

class View extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { users, form, dispatch, type, onSubmit, ...rest } = this.props;
    const { getFieldProps, getFieldError, isFieldValidating } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    return (
      <div>
        <Form  layout="horizontal">
          <h3>基本信息设置</h3>
          <br />
          <Row>
            <Col offset={2} span={10}>
               <FormItem
                {...formItemLayout}
                label="姓名"
                >
                <p>{ form.getFieldValue('name') }</p>
                </FormItem>
            </Col>
            <Col span={12}>
               <FormItem
                {...formItemLayout}
                label="是否为管理员"
                >
                <p>{ form.getFieldValue('is_admin') }</p>
                </FormItem>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
               <FormItem
                {...formItemLayout}
                label="用户名"
                >
                <p>{ form.getFieldValue('username') }</p>
                </FormItem>
            </Col>
            <Col span={12}>
                <FormItem
                {...formItemLayout}
                label="性别"
                >
                <p>{ form.getFieldValue('sex') }</p>
                </FormItem>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
               <FormItem
                {...formItemLayout}
                label="邮箱"
                >
                <p>{ form.getFieldValue('email') }</p>
                </FormItem>
            </Col>
            <Col span={12}>
               <FormItem
                {...formItemLayout}
                label="部门"
                >
                <p>{ form.getFieldValue('department') }</p>
                </FormItem>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
               <FormItem
                {...formItemLayout}
                label="职位"
                >
                <p>{ form.getFieldValue('title') }</p>
                </FormItem>
            </Col>
            <Col span={12}>
               <FormItem
                {...formItemLayout}
                label="生日"
                >
                <p>{ form.getFieldValue('birthday') }</p>
                </FormItem>
            </Col>
          </Row>
          <Button size="large" type="ghost" style={{marginLeft:150}} onClick={ () => dispatch(routerRedux.goBack()) }>返回</Button>
        </Form>
      </div>
    );
  }
};

export default Form.create({
    mapPropsToFields: (props) => {
        const current = props.users.current;
        return {
            name: {
                value: current.name,
            },
            is_admin: {
                value: current.is_admin? "是" : "否",
            },
            username: {
                value: current.username,
            },
            password: {
                value: current.password,
            },
            sex: {
                value: current.sex ? "女" : "男",
            },
            email: {
                value: current.email || '暂无',
            },
            birthday: {
                value: current.birthday ? moment(current.birthday).format('YYYY-MM-DD') : '暂无',
            },
            title: {
                value: current.title || '暂无',
            }
          }
    }
})(View);
