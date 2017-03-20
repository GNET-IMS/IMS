import { routerRedux } from 'dva/router';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';

const initialState = {
  userId: '',
  access_token: '123'

}
export default {

  namespace: 'auth',

  state: initialState,

  effects: {
    *token({ payload }, { select, call, put }) {
      const { username, password } = payload;
      const { data, error } = yield request('/oauth/token', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic dHJ1c3RlZDpzZWNyZXQ=',  // trusted
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=password&username=${username}&password=${password}`,
      });

      if (error) {
        // TODO send error message to global show
        return false;
      }

      yield localStorage.setItem('authentication', true);
      yield localStorage.setItem('access_token', data.access_token);
      yield localStorage.setItem('uid', data.uid);
    }
  },

  reducers: {
  },

};
