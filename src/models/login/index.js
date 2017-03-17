import pathToRegexp from 'path-to-regexp';

const initialState = {
  loading: false,
  message: undefined,
}

export default {

  namespace: 'login',

  state: initialState,

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location, state) => {
        if (location.pathname === '/login') {
          dispatch({
            type: 'clear',
          })
          dispatch({
            type: 'user/clear'
          })
        }
      })
    }
  },

  effects: {
    *submit({ payload }, { put }) {
      yield put({ type: 'toggleLoading', payload: true });
      yield put({ type: 'oauth/token', payload, });
      yield put({ type: 'toggleLoading', payload: false });
    }
  },

  reducers: {
    toggleLoading(state, { payload }) {
      return { ...state, loading: payload }
    },
    setMessage(state, { payload: message }) {
      return { ...state, message }
    },
    clear(state) {
      return initialState
    },
  },

}
