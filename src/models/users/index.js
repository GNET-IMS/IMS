import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {create, view, remove, search} from '../../services/users';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';
import { parseError } from '../../utils/request';

const initialState = {
  query: {},
  users: [
    {
      id: '1',
      name: 'yehq',
      username: 'yehq',
      password: '1234',
      type: 'github1',
      createDate: '2016-02-13',
    },
  ],
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
        if (location.pathname === '/user/list') {
          dispatch({ type: 'clear' })
          dispatch({
            type: 'search',
            payload: {},
          });
        }
      });
    },
    itemSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/user/list/:action+').test(location.pathname)) {
          dispatch({ type: 'clear' })
        }
      })
    }, 
    editSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/user/list/:action/:id').test(location.pathname)) {
          const match = pathToRegexp('/user/list/:action/:id').exec(location.pathname);
          const id = match[2];
          dispatch({
            type: 'view',
            payload: id,
          });
        }
      });
    },
  },

  effects: {
    *search({ payload }, { put, select }) {
      yield put({
        type: 'toggleLoadding',
        payload: true,
      });

      const { access_token } = yield select( state => {
        return {
          'access_token': state.auth.access_token,
        }
      } );
      const { data, err } = yield search(access_token, payload);
      if (!err) {
        yield put({
          type: 'setUsers',
          payload: data.data && data.data.users,
        });

        yield put({
          type: 'toggleLoadding',
          payload: false,
        });

        yield message.success(data.message, 2);

        return true;
      }

      yield put({
        type: 'toggleLoadding',
        payload: false,
      });

      const error = yield parseError(err);
      yield message.error(`${error.message}`, 3);
      return false;
    },
    *view({ payload: id }, { put, select }) {
      const { access_token } = yield select( state => {
        return {
          'access_token': state.auth.access_token,
        }
      } );
      const { data, err } = yield view(access_token, id);

      if (!err) {
        yield put({
          type: 'setUser',
          payload: data.data && data.data.user,
        });
        yield message.success(data.message, 2);
        return true;
      }

      yield message.err(`加载用户信息失败：${err.message}`, 3);
      return false;
    },
    *add({ payload }, { put, call, select }) {
      yield put({
        type: 'toggleSubmiting',
        payload: true,
      });    

      const access_token = yield select( state => state.auth.access_token );
      const { data, err } = yield create(access_token, payload);
      if (!err) {
    	  yield message.success('添加成功', 2);
        yield put(routerRedux.goBack());
      } else {
        yield message.err(`添加失败：${err.message}`, 3);
      }
      yield put({
        type: 'toggleSubmiting',
        payload: false,
      });
    },
    *edit({ payload }, { put, call, select }) {
      yield put(routerRedux.goBack());      
      const access_token = yield select( state => state.auth.access_token );
      const { data, err } = yield create(access_token, payload);
      if (!err) {
    	  yield message.success('修改成功', 2);
        yield put(routerRedux.goBack());
      } else {
        yield message.err(`修改失败：${err.message}`, 3);
      }
      
    },
    *delete({ payload: id }, { put, select }) {
	    const { access_token } = yield select( state => {
        return {
  	      access_token: state.auth.access_token,
        }
      } );
      const { data, err } = yield remove(access_token, id);
      
      if (!err) {
        yield message.success('成功删除用户', 2);
        yield put({ type: 'search'})
        return true;
      }
      yield message.err(`删除用户失败：${err.message}`, 3);
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
      return { ...state, user }
    },
    setUsers(state, { payload: users}) {
      return { ...state, users }
    },
    clear(state) {
      return initialState
    },
  },

};
