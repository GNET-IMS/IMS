import React, { Component } from 'react';
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
                    <Button>
                        <a className={styles['signIn']} href="https://localhost:5000/dialog/authorize">登录授权</a>
                    </Button>
                </FormItem>
            </Form>
        </div>
        </div>
      
    );
  }
}


export default connect(selector)(Form.create()(LoginPage));