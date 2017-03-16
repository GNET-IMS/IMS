import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { routerRedux } from 'dva/router';

import Detail from './Detail';

const Add = (props) => {
  const { dispatch } = props;
  return (
    <Detail
      {...props}

      type="add"
      mapPropsToFields={ () => ({}) }
      onSubmit={ (e, form) => {
        e.preventDefault();
        
        form.validateFieldsAndScroll((errors, values) => {
          if (!!errors) {
            return;
          }
		  
          const formData = form.getFieldsValue();
          dispatch({
            type: 'users/add',
            payload: formData,
          })
		  
        });
		
      } }
    />
  )
}

export default Add;
