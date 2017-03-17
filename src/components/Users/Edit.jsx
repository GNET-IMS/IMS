import React, { Component } from 'react';

import Detail from './Detail';

const Edit = (props) => {
  const { dispatch, users } = props;
  return (
    <Detail
      {...props}

      type="edit"
      
      onSubmit={ (e, form) => {
        e.preventDefault();
        
        form.validateFieldsAndScroll((errors, values) => {
          if (!!errors) {
            return;
          }
          
          let formData = form.getFieldsValue();
          formData._id = users.current._id;
          if (!formData.password) delete formData.password;
          dispatch({
            type: 'users/edit',
            payload: formData,
          })
		  
		});

      } }
    />
  )
}

export default Edit;
