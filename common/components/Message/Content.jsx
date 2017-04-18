import React from 'react';
import { Modal, Form, Button } from 'antd';
import styles from './content.css';

const FormItem = Form.Item;

const Content = ({ form, message, dispatch, ...rest }) => {
    const current = message.current;
    const onOk = () => {
        dispatch({
            type: 'messages/toggleShowModal',
            payload: {
                showModal: false,
            },
        })
        form.resetFields();
    }
    return (
        <Modal
            title={current.title}
            { ...rest }
            okText="返回"
            cancelText="关闭"
            onOk={onOk}
            onCancel={() => {
                dispatch({
                    type: 'messages/toggleShowModal',
                    payload: {
                        showModal: false,
                    },
                })
                form.resetFields();
            }}
            footer={[
                <div className={styles['footer']} key={}>{current.created_at}</div>,
                <Button key="submit" type="primary" size="large" onClick={onOk}>
                    确定
                </Button>
            ]}
        >
            <Form layout="horizontal">
                <FormItem>
                    <div style={{ width: 450, height: 200 }}>
                        <p style={{ wordWrap: "break-word", wordBreak: 'normal', }}>{current.content}</p>
                    </div>
                </FormItem>
            </Form>
        </Modal>
    )
};

export default Form.create({

})(Content)
