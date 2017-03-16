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
  },

  reducers: {
  },

};
