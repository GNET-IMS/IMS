import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { view, remove, search, read, getPrivateMessages } from '../../services/notices';
import { getUnreadMessageNum, getMessages } from '../../services/users';
import { parseError } from '../../utils/request';

const initialState = {
  showModal: false,
  showMessageModal: false,
  messages: {
    list: [],
    pagination: {},
  },
  privateMessages: [],
  announcements: {
    list: [],
    pagination: {},
  },
  reminders: {
    list: [],
    pagination: {},
  },
  notices: [],
  pagination: {},
  current: {},
}

export default {

  namespace: 'notices',

  state: initialState,

  subscriptions: {
    listSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        dispatch({
          type: 'clear'
        })
        if (location.pathname === '/message') {
          // dispatch({
          //   type: 'getAnnouncements'
          // })
        }
      });
    },
  },

  effects: {
    *search({ payload }, { call, put, select }) {
      const userId = yield select(state => state.auth.userId);
      const { data, err } = yield search({ user_id: userId, ...payload });
      if (!err) {
        yield put({
          type: 'setNotices',
          payload: {
            messages: data.notices,
            pagination: data.pagination
          },
        });
        return true;
      }
      const error = yield parseError(err);
      yield message.error(`${error.message}`, 3);
      return false;
    },
    *getAnnouncements({ payload }, { call, put, select }) {
      const userId = yield select(state => state.auth.userId);
      const { data, err } = yield search({ user_id: userId, type: 1 });
      if (!err) {
        yield put({
          type: 'setAnnouncements',
          payload: data,
        });
        return true;
      }
      const error = yield parseError(err);
      yield message.error(`${error.message}`, 3);
      return false;
    },
    *getMessages({ payload }, { call, put, select }) {
      const userId = yield select(state => state.auth.userId);
      const { data, err } = yield getMessages(userId);
      if (!err) {
        yield put({
          type: 'setMessages',
          payload: data,
        });
        return true;
      }
      const error = yield parseError(err);
      yield message.error(`${error.message}`, 3);
      return false;
    },
    *getReminders({ payload }, { call, put, select }) {
      const userId = yield select(state => state.auth.userId);
      const { data, err } = yield search({ user_id: userId, type: 3 });
      if (!err) {
        yield put({
          type: 'setReminders',
          payload: data
        });
        return true;
      }
      const error = yield parseError(err);
      yield message.error(`${error.message}`, 3);
      return false;
    },
    *getPrivateMessages({ payload }, { call, put, select }) {
      const userId = yield select(state => state.auth.userId);
      const { data, err } = yield getPrivateMessages({ type: 2, ...payload });
      if (!err) {
        yield put({
          type: 'setPrivateMessages',
          payload: data.privateMessages,
        });
        return true;
      }
      const error = yield parseError(err);
      yield message.error(`${error.message}`, 3);
      return false;
    },
    *view({ payload }, { put, select }) {
      if (payload.is_read) {
        yield put({
          type: 'toggleShowModal',
          payload: {
            showModal: payload.showModal,
            current: payload
          },
        });
        return true;
      }
      const { data, err } = yield read(payload.id);
      if (!err) {
        yield put({
          type: 'toggleShowModal',
          payload: {
            showModal: payload.showModal,
            current: payload
          },
        });
        yield put({
          type: 'setRead',
          payload: payload.id
        })
        yield put({
          type: 'auth/getUnreadNum'
        })
        return true;
      }

      const error = yield parseError(err);
      yield message.err(`加载消息失败：${error.message}`, 3);
      return false;
    },
    *delete({ payload: id }, { put, select }) {
      const { data, err } = yield remove(id);
      if (!err) {
        yield message.success('成功删除消息', 2);
        yield put({ type: 'search' })
        return true;
      }
      const error = yield parseError(err);
      yield message.error(`删除消息失败：${error.message}`, 3);
      return false;
    },
  },

  reducers: {
    setNotices(state, { payload }) {
      return { ...state, ...payload }
    },
    setAnnouncements(state, { payload }) {
      return { ...state, announcements: { list: payload.notices, pagination: payload.pagination } }
    },
    setMessages(state, { payload }) {
      return { ...state, messages: { list: payload.messages, pagination: payload.pagination } }
    },
    setReminders(state, { payload }) {
      return { ...state, reminders: { list: payload.notices, pagination: payload.pagination } }
    },
    setPrivateMessages(state, { payload }) {
      return { ...state, privateMessages: payload }
    },
    setNotice(state, { payload: current }) {
      return { ...state, current }
    },
    toggleShowModal(state, { payload }) {
      return { ...state, ...payload }
    },
    toggleShowMessageModal(state, { payload: showMessageModal }) {
      return { ...state, showMessageModal }
    },
    setRead(state, { payload: id }) {
      let messages = state.messages;
      messages.forEach(item => {
        if (item.id === id) {
          item.is_read = true;
        }
      })
      return { ...state, messages }
    },
    clear(state) {
      return initialState
    },
  },

}
