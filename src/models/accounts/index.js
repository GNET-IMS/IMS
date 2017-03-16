import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {create, createmore, view, remove, search} from '../../services/accounts';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';

const mergeQuery = (oldQuery, newQuery) => {
  return {
    ...oldQuery,
    ...newQuery,
    page: (newQuery.page ? newQuery.page - 1 : 0),
  }
}

const initialState = {
  query: {},
  accounts: [
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

  namespace: 'accounts',

  state: initialState,

  subscriptions: {
    /*listSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (location.pathname === '/account/list') {
          dispatch({ type: 'clear' })
          dispatch({
            type: 'setQuery',
            payload: location.query,
          });
        }
      });
    },
    itemSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/account/list/:action+').test(location.pathname)) {
          dispatch({ type: 'clear' })

        }
      })
    }, 
    editSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/account/list/:action/:id').test(location.pathname)) {
          const match = pathToRegexp('/account/list/:action/:id').exec(location.pathname);
          const id = match[2];
          dispatch({
            type: 'view',
            payload: id,
          });
        }
      });
    },*/

    // setup({ dispatch, history }) {  // eslint-disable-line
    // },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    /*setQuery: [function*({ payload: query }, { put, select }) {
      yield put({
        type: 'toggleLoadding',
        payload: true,
      });

      const { access_token, oldQuery } = yield select( state => {
        return {
          'access_token': state.oauth.access_token,
          'oldQuery': state.accounts.query,
        }
      } );
      const { data, error } = yield search(access_token, mergeQuery(oldQuery, query));

      if (!error) {
        yield put({
          type: 'setAccount',
          payload: {
          },
        });

        yield put({
          type: 'toggleLoadding',
          payload: false,
        });

        return true;
      }

      yield put({
        type: 'toggleLoadding',
        payload: false,
      });

      const err = yield parseError(error);
        yield message.error(`加载账号信息失败：${err.message}`, 3);
        return false;
    }, { type: 'takeLatest' }],*/
    *add({ payload }, { put, call, select }) {
      yield put({
        type: 'toggleSubmiting',
        payload: true,
      });
      yield put({
        type: 'setCurrent',
        payload,
      });     

      /*const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield create(access_token, payload);
      if (!error) {
    	yield message.success('添加成功', 2);
        yield put(routerRedux.goBack());
      } else {
    	  const err = yield parseError(error);
        yield message.error(`添加失败：${err.message}`, 3);
      }*/
      yield put({
        type: 'toggleSubmiting',
        payload: false,
      });
    },
    *addmore({ payload }, { put, call, select }) {
      yield put({
        type: 'toggleSubmiting',
        payload: true,
      });
      yield put({
        type: 'setCurrent',
        payload,
      });     

      /*const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield createmore(access_token, payload);
      if (!error) {
    	yield message.success('添加成功', 2);
        yield put(routerRedux.goBack());
      } else {
    	  const err = yield parseError(error);
        yield message.error(`添加失败：${err.message}`, 3);
      }*/
      yield put({
        type: 'toggleSubmiting',
        payload: false,
      });
    },
    *edit({ payload }, { put, call, select }) {
      
      yield put(routerRedux.goBack());      
      /*const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield create(access_token, payload);
      if (!error) {
    	yield message.success('修改成功', 2);
        yield put(routerRedux.goBack());
      } else {
    	  const err = yield parseError(error);
        yield message.error(`修改失败：${err.message}`, 3);
      }*/
      
    },
    *delete({ payload: id }, { put, select }) {
	    /*const { access_token, query } = yield select( state => {
        return {
  	      access_token: state.oauth.access_token,
  	      query: state.boxs.query,
        }
      } );
      const { data, error } = yield remove(access_token, id);
      
      if (!error) {
        yield message.success('成功删除账号', 2);
        yield put({ type: 'setQuery', payload: query })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`删除账号失败：${err.message}`, 3);
      return false;*/
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
    setAccount(state, { payload }) {
      return { ...state, ...payload }
    },
    clear(state) {
      return initialState
    },
  },

};
