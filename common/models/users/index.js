import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { create, view, remove, search, update } from '../../services/users';
import querystring from 'querystring';
import { parseError } from '../../utils/request';
import MatchPath from '../../utils/MatchPath';

const initialState = {
  query: {},
  users: [],
  pagination: {
    current: 1,
    pageSize: 10,
  },
  submiting: false,
  loadding: false,
  current: {},

}
export default {

  namespace: 'users',

  state: initialState,

  subscriptions: {
    listSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        const matchPath = new MatchPath(location.pathname);
        matchPath
          .match('/user/list', () => {
            dispatch({
              type: 'search',
              payload: {},
            });
          })
          .match('/user/list/:action/:id', match => {
            const id = match[2];
            dispatch({
              type: 'view',
              payload: id,
            });
          })
          .unmatched(() => {
            dispatch({ type: 'clear' })
          })
      });
    },
  },

  effects: {
    *search({ payload }, { put, select }) {
      const { data, err } = yield search(payload);
      if (!err) {
        yield put({
          type: 'setUsers',
          payload: {
            users: data.users,
            pagination: data.pagination
          },
        });

        return true;
      }
      const error = yield parseError(err);
      yield message.error(`${error.message}`, 3);
      return false;
    },
    *view({ payload: id }, { put, select }) {
      const { data, err } = yield view(id);
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
    *add({ payload }, { put, call, select }) {
      const { userId } = yield select(state => {
        return {
          userId: state.auth.userId
        }
      });
      const { data, err } = yield create({ target: payload, creator: userId });
      if (!err) {
        yield message.success('添加成功', 2);
        yield put(routerRedux.goBack());
      } else {
        const error = yield parseError(err);
        yield message.error(`添加失败：${error.message}`, 3);
      }
    },
    *edit({ payload }, { put, call, select }) {
      const { data, err } = yield update(payload);
      if (!err) {
        yield message.success('修改成功', 2);
        yield put(routerRedux.goBack());
      } else {
        const error = yield parseError(err);
        yield message.error(`修改失败：${error.message}`, 3);
      }

    },
    *delete({ payload: id }, { put, select }) {
      const { data, err } = yield remove(id);
      if (!err) {
        yield message.success('成功删除用户', 2);
        yield put({ type: 'search' })
        return true;
      }
      const error = yield parseError(err);
      yield message.error(`删除用户失败：${error.message}`, 3);
      return false;
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    toggleSubmiting(state, { payload: submiting }) {
      return { ...state, submiting }
    },
    setCurrent(state, { payload: current }) {
      return { ...state, current }
    },
    setUser(state, { payload: user }) {
      return { ...state, current: user }
    },
    setUsers(state, { payload }) {
      return { ...state, ...payload }
    },
    clear(state) {
      return initialState
    },
  },

};
