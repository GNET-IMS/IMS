import { routerRedux } from 'dva/router';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';
import request, { parseError } from '../utils/request';

const initialState = {
  userId: '58c7b1e697b7d7d6968bb7ff',
  access_token: '123',
  authentication: false,
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
    *authorize({ payload }, { select, call, put }) {
      const { data, err } = yield request('https://localhost:3000/dialog/authorize', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic YWRtaW46MTIzNA==',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=password&username=${username}&password=${password}&scope=offline-access`,
      })
    },
    // *token({ payload }, { select, call, put }) {
    //   const { username, password } = payload;
    //   const { data, err } = yield request('https://localhost:3000/oauth/token', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': 'Basic YWRtaW46MTIzNA==',
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: `grant_type=password&username=${username}&password=${password}&scope=offline-access`,
    //   });

    //   if (err) {
    //     // TODO send error message to global show
    //     const error = yield parseError(err);
    //     yield message.error(JSON.stringify(error), 5);
    //     return false;
    //   }
    //   console.log(data)
    //   yield localStorage.setItem('authentication', true);
    //   yield localStorage.setItem('access_token', data.access_token);
    //   yield localStorage.setItem('uid', data.uid);
    // }
  },

  reducers: {
  },

};
