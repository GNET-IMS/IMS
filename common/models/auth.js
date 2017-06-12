import { routerRedux } from 'dva/router';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';
import request, { parseError } from '../utils/request';
import { getCurrentUser, getUnreadMessageNum } from '../services/users';

const initialState = {
  // userId: sessionStorage.getItem('userId') || '',
  // isAutnorized: sessionStorage.getItem('userId') ? true : false,
  userId: '',
  isAutnorized: false,
  user: {},
  unreadNum: '0',
  socket: {},
}
export default {

  namespace: 'auth',

  state: initialState,

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location, state) => {
        if (location.pathname === '/login') {
          dispatch({
            type: 'clear',
          })
        }
      })
    }
  },

  effects: {
    *getCurrentUser({ payload }, { select, call, put }) {
      const { data, err } = yield getCurrentUser();
      if (err) {
        const error = parseError(err);
        message.error(error.message, 2);
        return false
      }
      yield put({
        type: 'setUser',
        payload: data.user,
      })
      yield sessionStorage.setItem('userId', data.user.id);
      yield put({
        type: 'setUserId',
        payload: data.user.id,
      })
    },
    *init({ payload }, { select, call, put }) {
      const { data, err } = yield getCurrentUser();
      if (err) {
        const error = parseError(err);
        message.error(error.message, 2);
        return false;
      }
      yield put({
        type: 'setUser',
        payload: data.user,
      })
      yield sessionStorage.setItem('userId', data.user.id);
      yield put({
        type: 'setUserId',
        payload: data.user.id,
      })

      // const result = yield getUnreadMessageNum(data.user.id);
      // if (result.err) {
      //   const error = parseError(result.err);
      //   message.error(error.message, 2);
      //   return false;
      // }
      // yield put({
      //   type: 'setUnreadNum',
      //   payload: result.data.unreadNum
      // })
    },
    *getUnreadNum({ payload }, { select, call, put }) {
      const userId = yield select(state => state.auth.userId);
      const { data, err } = yield getUnreadMessageNum(userId);
      if (err) {
        const error = parseError(err);
        message.error(error.message, 2);
        return false;
      }
      yield put({
        type: 'setUnreadNum',
        payload: data.unreadNum
      })
    }
  },

  reducers: {
    setUser(state, { payload: user }) {
      return { ...state, user };
    },
    setUserId(state, { payload: userId }) {
      return { ...state, userId };
    },
    setUnreadNum(state, { payload: unreadNum }) {
      return { ...state, unreadNum }
    },
    setSocket(state, { payload: socket }) {
      return { ...state, socket }
    }
  },

};
