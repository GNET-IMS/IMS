import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Select,Switch } from 'antd';
import { routerRedux } from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;

class Detail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { users, form, dispatch, type, onSubmit, ...rest } = this.props;
    const { getFieldProps, getFieldError, isFieldValidating } = form;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '姓名不得为空' }
      ]
    });
    const userProps = getFieldProps('username', {
      rules: [
        { required: true, message: '用户名不得为空' }
      ]
    });
    const passwordProps = getFieldProps('password', {
      rules: [
        { required: true, message: '密码不得为空' }
      ]
    });
    const sexProps = getFieldProps('sex');
    const birthdayProps = getFieldProps('birthday');
    const emailProps = getFieldProps('email');
    const departmentProps = getFieldProps('department', {
      rules: [
        { required: true, message: '部门不得为空' }
      ]
    });
    const titleProps = getFieldProps('title');
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    const is_adminProps = getFieldProps('is_admin', {
      rules: [
        { required: true, message: '是否为管理员必须选择' }
      ]
    });
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
                hasFeedback
                help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                >
                <Input {...nameProps} />
                </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="是否为管理员"
                hasFeedback
                help={isFieldValidating('is_admin') ? '校验中...' : (getFieldError('is_admin') || []).join(', ')}
                >
                <Switch {...is_adminProps} checkedChildren="是" unCheckedChildren="否" />
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
                <Input {...userProps} />
                </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="密码"
                hasFeedback
                help={isFieldValidating('password') ? '校验中...' : (getFieldError('password') || []).join(', ')}
                >
                <Input {...passwordProps} />
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
                <Input {...sexProps} />
                </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="邮箱"
                hasFeedback
                help={isFieldValidating('email') ? '校验中...' : (getFieldError('email') || []).join(', ')}
                >
                <Input {...emailProps} />
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
                <Input {...departmentProps} />
                </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="职位"
                hasFeedback
                help={isFieldValidating('title') ? '校验中...' : (getFieldError('title') || []).join(', ')}
                >
                <Input {...titleProps} />
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
                <Input {...birthdayProps} />
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
                onClick={ (e) => onSubmit(e, form)}
                >{type==="edit"?"保存":"新增"}</Button>
              </Col>
              <Col span={3}>
               <Button size="large" type="ghost" onClick={ () => dispatch(routerRedux.goBack()) }>取消</Button>
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
      const users = props.users.users[0];
      if(type=="add"){
          return {
            password: {
                value: 1234
            },
          }
      }else{
          return {
            name: {
                value: users.name,
            },
            type: {
                value: users.type,            
            },
            user: {
                value: users.username,
            },
            password: {
                value: users.password,
            },
          }
      }
     
    
  }
})(Detail);