import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Select, Switch } from 'antd';
import { routerRedux } from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;

class BatchAdd extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { form, dispatch } = this.props;
    const { getFieldProps, getFieldError, isFieldValidating } = form;

    const formItemLayout = {
      wrapperCol: { span: 12 },
    };
    const children = [];
    const onSubmit= (e, form) => {
        e.preventDefault();
        
        form.validateFieldsAndScroll((errors, values) => {
          if (!!errors) {
            return;
          }
		  
          const formData = form.getFieldsValue();
          console.log(formData);
          var Data,
              user0 = {},
              user1 = {},
              user2 = {},
              user3 = {},
              user4 = {},
              dataAll = [];
              
          for (Data in formData){
                  if(Data.split("_",2)[1] == 0){
                    user0[Data.split("_",2)[0]] = formData[Data];
                  }else if(Data.split("_",2)[1] == 1){
                    user1[Data.split("_",2)[0]] = formData[Data];
                  }else if(Data.split("_",2)[1] == 2){
                    user2[Data.split("_",2)[0]] = formData[Data];
                  }else if(Data.split("_",2)[1] == 3){
                    user3[Data.split("_",2)[0]] = formData[Data];
                  }else if(Data.split("_",2)[1] == 4){
                    user4[Data.split("_",2)[0]] = formData[Data];
                  }
          }
          dataAll.push(user0, user1, user2, user3, user4);
          console.log(dataAll);
          dispatch({
            type: 'users/addmore',
            payload: dataAll,
          })
		  
        });
		
      };
    for (let i = 0; i < 5; i++) {
      children.push(
        <Row key={i}>
            <Col span={6}>
            <FormItem
                {...formItemLayout}
                hasFeedback
                help={isFieldValidating(`name_${i}`) ? '校验中...' : (getFieldError(`name_${i}`) || []).join(', ')}
                >
                <Input {...getFieldProps(`name_${i}`, {
                    rules: [
                      { required: true, message: '姓名不得为空' }
                    ]
                  })} />
            </FormItem>
            </Col>
            <Col span={6}>
                <FormItem
                {...formItemLayout}
                hasFeedback
                help={isFieldValidating(`username_${i}`) ? '校验中...' : (getFieldError(`username_${i}`) || []).join(', ')}
                >
                <Input {...getFieldProps(`username_${i}`, {
                    rules: [
                      { required: true, message: '用户名不得为空' }
                    ]
                  })} />
                </FormItem>
            </Col>
            <Col span={6}>
                <FormItem
                {...formItemLayout}
                hasFeedback
                help={isFieldValidating(`password_${i}`) ? '校验中...' : (getFieldError(`password_${i}`) || []).join(', ')}
                >
                    <Input {...getFieldProps(`password_${i}`, {
                    rules: [
                      { required: true, message: '密码不得为空' }
                    ]
                  })} />
                </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                hasFeedback
                help={isFieldValidating(`department_${i}`) ? '校验中...' : (getFieldError(`department_${i}`) || []).join(', ')}
                >
                <Input {...getFieldProps(`department_${i}`, {
                    rules: [
                      { required: true, message: '部门不得为空' }
                    ]
                  })} />
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
          <Row>
            <Col span={6}>
                <FormItem label="姓名" style={{marginLeft:50}}></FormItem>
            </Col>
            <Col span={6}>
                <FormItem label="用户名" style={{marginLeft:45}}></FormItem>
            </Col>
            <Col span={6}>
                <FormItem label="密码" style={{marginLeft:50}}></FormItem>
            </Col>
            <Col span={6}>
                <FormItem label="部门" style={{marginLeft:50}}></FormItem>
            </Col>
          </Row>
            {children.slice(0,5)}
          <FormItem>
            <Row>
              <Col span={3} offset={8}>
                <Button type="primary" htmlType="submit" size="large"
                onClick={ (e) => onSubmit(e, form)}
                >批量新增</Button>
              </Col>
              <Col span={3}>
               <Button size="large" onClick={ () => dispatch(routerRedux.goBack()) }>取消</Button>
              </Col>
            </Row>      
          </FormItem>
          
        </Form>
      </div>
    );
  }
};

BatchAdd.propTypes = {
};
BatchAdd.defaultProps = {
  mapPropsToFields: () => ({}),
}

export default Form.create({
    mapPropsToFields: (props) => {
        return {
        password_0: {
            value: 1234
        },
        password_1: {
            value: 1234
        },
        password_2: {
            value: 1234
        },
        password_3: {
            value: 1234
        },
        password_4: {
            value: 1234
        },
        }
        
    }
})(BatchAdd);