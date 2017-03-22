import pathToRegexp from 'path-to-regexp';

const initialState = {
  loading: false,
  showModal: false,
  current_message: undefined,

}

export default {

  namespace: 'message',

  state: initialState,

  subscriptions: {
  },

  effects: {
  },

  reducers: {
    toggleLoading(state, { payload }) {
      return { ...state, loading: payload }
    },
    toggleShowModal(state , { payload }) {
        return { ...state, ...payload }
    },
    clear(state) {
      return initialState
    },
  },

}
