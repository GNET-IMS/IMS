import React from 'react';
import { Modal, Form } from 'antd';

const FormItem = Form.Item;

const Content = ({ form, message, dispatch, ...rest}) => {
      return (
          <Modal
            title="消息详情"
            { ...rest }
            okText="返回"
            cancelText="关闭"
            onOk={() => {

                dispatch({
                    type: 'message/toggleShowModal',
                    payload: {
                        showModal: false,
                    },
                })
                form.resetFields();
            } }
            onCancel={ () => {

                dispatch({
                    type: 'message/toggleShowModal',
                    payload: {
                        showModal: false,
                    },
                })
                form.resetFields();
            } }
          >
            <Form   layout="horizontal">
                <FormItem>
                    <div style={{width:450, height:200}}>
                        <p style={{ wordWrap:"break-word",wordBreak:'normal',}}>{message.current_message}</p>
                    </div>   
                </FormItem>
            </Form>
          </Modal>
      )
  };

  export default Form.create({

  })(Content)
