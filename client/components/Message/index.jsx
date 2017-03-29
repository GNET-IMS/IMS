import React from 'react';
import { Table } from 'antd';

import styles from './index.css';
import Content from './Content';


const Message = ({dispatch, message}) => {
  const columns = [
    {
      title: '',
      dataIndex: 'content',
      width: 600,
      className: 'deleteall',
      key: 'content',
      render: (text, record) =>(
        <span className={styles['content']}><a href="javascript:;" onClick={ () => {
                              dispatch({
                                type: 'message/toggleShowModal',
                                payload: {
                                  showModal: true,
                                  current_message: record.content,
                                  
                                }
                              })
                              console.log(message.showModal);
                            } } >{text}</a></span>
      )
    },
    {
      title: '',
      dataIndex: '_id',
      key: 'operation',
      width: 100,
      render: (text, record, index) => (
        <span>
          <a href="javascript:;" style={{marginLeft:20}} >删除</a>
        </span>
      )
    }
    ];
  const dataSource = [
    {
      key: "1",
      content: "lalLLLLLLlallalalalallalallallallalaallallalallalalallalalalalalalalallalallalalalallalallallallallalalLLLLalalalallallalalallalalalallalallalallalalalallalalalalalaallalalalalalalallalallalallalalallallalalallaalallalallalalallalallalallallallalaalllalalalaalalallallalallallallalllaalalalalaLALALALLALALLAlalallallllallalllalallalallalalalalllallalalalalallalalallalalalala",
    },
    {
      key: "2",
      content: "消息2"
    },
    {
      key: "3",
      content: "消息3啦啦啦"
    },
    {
      key: "4",
      content: "Message"
    },
    {
      key: "5",
      content: "MessageTwo"
    },
    {
      key: "6",
      content: "MessageThird"
    },
    {
      key: "7",
      content: "MessageThird"
    },
    {
      key: "8",
      content: "MessageThird"
    },
    {
      key: "9",
      content: "MessageThird"
    },
    {
      key: "10",
      content: "MessageThird"
    },
    {
      key: "11",
      content: "MessageThird"
    }
  ];
  console.log(message.showModal);
  return (
    <div>
      <Table showHeader={false} dataSource={dataSource} columns={columns} pagination={{pageSize:7}} />
      <Content
      dispatch= { dispatch }
      visible={message.showModal}
      message={message} />
    </div>
  );
};

Message.propTypes = {
};

export default Message;