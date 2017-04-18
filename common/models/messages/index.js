import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { view, remove, search, read } from '../../services/messages';
import { parseError } from '../../utils/request';

const initialState = {
  loading: false,
  showModal: false,
  current_message: undefined,
  pagination: {},
  messages: [],
  current: {},
}

export default {

  namespace: 'messages',

  state: initialState,

  subscriptions: {
    listSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (location.pathname === '/message') {
          dispatch({ type: 'clear' })
          dispatch({
            type: 'search',
            payload: {},
          });
        }
      });
    },
  },

  effects: {
    *search({ payload }, { call, put, select }) {
      const { access_token, userId } = yield select(state => {
        return {
          'access_token': state.auth.access_token,
          userId: state.auth.userId,
        }
      });
      const { data, err } = yield search(access_token, {to: userId, ...payload});
      if (!err) {
        yield put({
          type: 'setMessages',
          payload: {
            messages: data.messages,
            pagination: data.pagination
          },
        });
        return true;
      }
      const error = yield parseError(err);
      yield message.error(`${error.message}`, 3);
      return false;
    },
    *view({ payload }, { put, select }) {
      const { access_token } = yield select(state => {
        return {
          'access_token': state.auth.access_token,
        }
      });
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
      const { data, err } = yield read(access_token, payload._id);
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
          payload: payload._id
        })
        return true;
      }

      const error = yield parseError(err);
      yield message.err(`加载消息失败：${error.message}`, 3);
      return false;
    },
    *delete({ payload: id }, { put, select }) {
      const { access_token } = yield select(state => {
        return {
          access_token: state.auth.access_token,
        }
      });
      const { data, err } = yield remove(access_token, id);
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
    setMessages(state, { payload }) {
      return { ...state, ...payload }
    },
    setMessage(state, { payload: current }) {
      return { ...state, current }
    },
    toggleShowModal(state, { payload }) {
      return { ...state, ...payload }
    },
    setRead(state, { payload: id }) {
      let messages = state.messages;
      messages.forEach(item => {
        if (item._id === id) {
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
