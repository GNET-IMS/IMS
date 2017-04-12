import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { view, update } from '../../services/users';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';
import { parseError } from '../../utils/request';

const initialState = {
  user: {},
  disabled: true,
}
export default {

  namespace: 'personal',

  state: initialState,

  subscriptions: {
    listSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (location.pathname === '/user/list') {
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
    *view({ payload }, { put, select }) {
      const { access_token, userId } = yield select( state => {
        return {
          'access_token': state.auth.access_token,
          userId:  state.auth.userId,
        }
      } );
      const { data, err } = yield view(access_token, userId);
      if (!err) {
        yield put({
          type: 'setUser',
          payload: data.user,
        });
        return true;
      }

      const error = yield parseError(err);
      yield message.err(`加载用户信息失败：${error.message}`, 3);
      return false;
    },
    *edit({ payload }, { put, call, select }) {
      const { access_token, userId } = yield select(state => {
        return {
          access_token: state.auth.access_token,
          userId: state.auth.userId,
        }
      });
      payload._id = userId;
      const { data, err } = yield update(access_token, payload);
      if (!err) {
        yield message.success('修改成功', 2);
        yield put({type: 'view'})
        yield put({type: 'disable'});
      } else {
        const error = yield parseError(err);
        yield message.error(`修改失败：${error.message}`, 3);
      }

    },
  },

  reducers: {
    setUser(state, { payload: user }) {
      return { ...state, user };
    },
    disable(state) {
      return { ...state, disabled: true};
    },
    enable(state) {
      return { ...state, disabled: false};
    },
    clear(state) {
      return initialState
    },
  },

};
