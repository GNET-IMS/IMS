import React, { Component, PropTypes } from 'react';
import { Button, Input, Row, Col, Form, Alert, Icon } from 'antd';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';

import selector from '../models/login/selector';

import styles from './LoginPage.css';

const FormItem = Form.Item;
class LoginPage extends Component {

  render() {
    const {  form, dispatch } = this.props;
    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    

    
    return (
        <div className={styles['bg']}>
            <div className={styles['box']}>
            <Form layout="horizontal">
                <FormItem>
                    <div className={styles['avatar']}></div>
                </FormItem>
                <FormItem>
                {getFieldDecorator('username', {
                    rules: [
                      { required: true, message: '必须填写用户账号' }
                    ],
                })(
                  <Input className={styles['ipt']} placeholder="username" prefix={<Icon type="user" style={{color:"#787878",marginLeft:65}} />} />
                )}
                    
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [
                    { required: true, message: '请填写密码' }
                    ],
                })(
                <Input className={styles['ipt']} placeholder="password" prefix={<Icon type="lock" style={{color:"#787878",marginLeft:65}} />} />
                )}
                    
                </FormItem>
                <FormItem>
                    <Button className={styles['signIn']}
                    onClick={ (e) => {
                        e.preventDefault();

                        form.validateFields((errors, values) => {
                        if (!!errors) {
                            return false;
                        }

                        const formData = form.getFieldsValue();
                        console.log(formData);
                        dispatch({
                            type: 'login/submit',
                            payload: {
                            username: formData.telephone,
                            password: formData.password,
                            },
                        })
                        });
                    } }>登录</Button>
                </FormItem>
            </Form>
        </div>
        </div>
      
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(selector)(Form.create()(LoginPage));