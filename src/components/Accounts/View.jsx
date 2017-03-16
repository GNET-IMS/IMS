import React, { Component } from 'react';
import { Form, Row, Col,Button } from 'antd';
import { routerRedux } from 'dva/router';


const FormItem = Form.Item;

class View extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { accounts, form, dispatch, type, onSubmit, ...rest } = this.props;
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
            <Col span={12}>
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
            <Col span={12}>
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
                label="密码"
                >
                <p>{ form.getFieldValue('password') }</p>
                </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
               <FormItem
                {...formItemLayout}
                label="性别"
                >
                <p>{ form.getFieldValue('sex') }</p>
                </FormItem>
            </Col>
            <Col span={12}>
               <FormItem
                {...formItemLayout}
                label="邮箱"
                >
                <p>{ form.getFieldValue('email') }</p>
                </FormItem>
            </Col>
          </Row>
          <Button size="large" type="ghost" style={{marginLeft:100}} onClick={ () => dispatch(routerRedux.goBack()) }>返回</Button>
        </Form>
      </div>
    );
  }
};

export default Form.create({
    mapPropsToFields: (props) => {
        const accounts = props.accounts.accounts[0];
        return {
            name: {
                value: accounts.name,
            },
            is_admin: {
                value: accounts.is_admin? "是" : "否",            
            },
            username: {
                value: accounts.username,
            },
            password: {
                value: accounts.password,
            },
            sex: {
                value: accounts.sex ? "女" : "男",
            },
            email: {
                value: accounts.email,
            }
          }
    }
})(View);