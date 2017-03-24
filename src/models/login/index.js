import pathToRegexp from 'path-to-regexp';

const initialState = {
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
        }
      })
    }
  },

  effects: {
    *submit({ payload }, { put }) {
      
    }
  },

  reducers: {
    clear(state) {
      return initialState
    },
  },

}
