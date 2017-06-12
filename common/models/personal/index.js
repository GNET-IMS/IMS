import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { view, update } from '../../services/users';
import querystring from 'querystring';
import { parseError } from '../../utils/request';
import MatchPath from '../../utils/MatchPath';

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
        const matchPath = new MatchPath(location.name);
        matchPath
          .match('/user/list', () => {
            dispatch({
              type: 'search',
              payload: {},
            });
          })
          .unmatched(() => {
            dispatch({ type: 'clear' })
          })
      });
    },
  },

  effects: {
    *view({ payload }, { put, select }) {
      const { userId } = yield select(state => {
        return {
          userId: state.auth.userId,
        }
      });
      const { data, err } = yield view(userId);
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
      const { userId } = yield select(state => {
        return {
          userId: state.auth.userId,
        }
      });
      payload.id = userId;
      const { data, err } = yield update(payload);
      if (!err) {
        yield message.success('修改成功', 2);
        yield put({ type: 'view' })
        yield put({ type: 'disable' });
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
      return { ...state, disabled: true };
    },
    enable(state) {
      return { ...state, disabled: false };
    },
    clear(state) {
      return initialState
    },
  },

};
