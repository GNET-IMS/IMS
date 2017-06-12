import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { search as fetchRooms, create as fetchRoom } from '../../services/chatRooms';
import { search as fetchMessages } from '../../services/chatMessages';
import { parseError } from '../../utils/request';
import MatchPath from '../../utils/MatchPath';

const initialState = {
	socket: {},
	rooms: {
		list: [],
		pagination: {}
	},
	messages: {
		list: [],
		pagination: {}
	},
	target: {},
	showRoom: false,
}

export default {

	namespace: 'chat',

	state: initialState,

	subscriptions: {
		mainSubscriptions({ dispatch, history }) {
			history.listen((location, state) => {
				const matchPath = new MatchPath(location.pathname);
				matchPath
					.match('/chat', () => {
						dispatch({
							type: 'getRooms'
						})
					})
					.unmatched(() => {
						dispatch({
							type: 'clear'
						})
					})
			});
		},
	},

	effects: {
		*getRooms({ payload }, { call, put, select }) {
			const userId = yield select(state => state.auth.userId);
			const { data, err } = yield fetchRooms(userId);
			if (err) {
				const error = yield parseError(err);
				message.error(error.message, 2);
				return false;
			}
			yield put({
				type: 'setRooms',
				payload: data
			})
		},
		*getRoom({ payload }, { call, put, select }) {
			const userId = yield select(state => state.auth.userId);
			const members = [payload.id, userId];
			const { data, err } = yield fetchRoom(members);
			if (err) {
				const error = yield parseError(err);
				message.error(error.message, 2);
				return false;
			}
			yield put({
				type: 'setRoom',
				payload: data.chat_room,
			})
			yield put({
				type: 'toggleRoom',
				payload: true
			})
		},
		*getMessages({ payload, callback }, { call, put, select }) {
			const { data, err } = yield fetchMessages(payload);
			if (err) {
				const error = yield parseError(err);
				message.error(error.message, 2);
				return false;
			}
			callback(data)
		},
		*sendMessage({ payload }, { call, put, select }) {
			const socket = yield select(state => state.auth.socket);
			payload.mid = Date.now();
			payload.status = 'sending';
			socket.emit('chat_request', payload);
			yield put({
				type: 'addMessage',
				payload: payload
			})
		},
		*receiveMessage({ payload }, { call, put, select }) {
			console.log(payload)
			if (payload.mid) {
				payload.status = 'success';
				yield put({
					type: 'replaceMessage',
					payload
				})
			} else {
				yield put({
					type: 'addMessage',
					payload
				})
			}
		}
	},

	reducers: {
		setSocket(state, { payload: socket }) {
			return { ...state, socket }
		},
		setMessages(state, { payload }) {
			return {
				...state,
				messages: {
					list: payload.chat_messages,
					pagination: payload.pagination
				}
			}
		},
		addMessages(state, { payload }) {
			let { list, pagination } = state.messages;
			list = list.concat(payload.chat_messages);
			pagination = payload.pagination;
			return { ...state, messages: { list, pagination } }
		},
		addMessage(state, { payload }) {
			const messages = state.messages;
			messages.list.unshift(payload);
			return { ...state, messages }
		},
		replaceMessage(state, { payload }) {
			let { list } = state.messages;
			for (let i = 0; i < list.length; i++) {
				if (list[i].mid === payload.mid) {
					list[i] = payload;
					break;
				}
			}
			return { ...state };
		},
		setRooms(state, { payload }) {
			return {
				...state,
				rooms: {
					list: payload.chat_rooms,
					pagination: payload.pagination
				}
			}
		},
		setRoom(state, { payload: room }) {
			return { ...state, room }
		},
		setTarget(state, { payload: target }) {
			return { ...state, target }
		},
		toggleRoom(state, { payload: showRoom }) {
			return { ...state, showRoom }
		},
		clear() {
			return initialState
		}
	},
}
