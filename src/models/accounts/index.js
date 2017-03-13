

const initialState = {
  accounts: [
    {
      id: '1',
      name: 'yehq',
      username: 'yehq',
      password: '1234',
      type: 'gitlab',
      createDate: '2016-02-13',
    }
  ]
}
export default {

  namespace: 'accounts',

  state: initialState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
