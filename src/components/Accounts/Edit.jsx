import React, { Component } from 'react';

import Detail from './Detail';

const Edit = (props) => {
  const { dispatch } = props;
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
          
          const formData = form.getFieldsValue();
          dispatch({
            type: 'accounts/edit',
            payload: formData,
          })
		  
		});

      } }
    />
  )
}

export default Edit;
