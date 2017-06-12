import { message } from 'antd';
import { getAnnouncements, pullAnnouncements } from '../../services/users';
import { parseError } from '../../utils/request';
import MatchPath from '../../utils/MatchPath';

const initialState = {
	announcements: [],
	pagination: {},
	current: {},
	needUpdate: false,
}

export default {

	namespace: 'announcements',

	state: initialState,

	subscriptions: {
		listSubscriptions({ dispatch, history }) {
			history.listen((location, state) => {
				const matchPath = new MatchPath(location.pathname);
				matchPath
					.match('/announcement', () => {
						dispatch({
							type: 'getAnnouncements'
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
		*getAnnouncements({ payload }, { call, put, select }) {
			const userId = yield select(state => state.auth.userId);
			const { data, err } = yield getAnnouncements(userId);
			if (!err) {
				yield put({
					type: 'setAnnouncements',
					payload: data,
				});
				yield put({
					type: 'toggleNeedUpdate',
					payload: false
				})
				return true;
			}
			const error = yield parseError(err);
			yield message.error(`${error.message}`, 3);
			return false;
		},
		*pullAnnouncements({ payload }, { call, put, select }) {
			const userId = yield select(state => state.auth.userId);
			const { data, err } = yield pullAnnouncements(userId);
			if (err) {
				const error = yield parseError(err);
				yield message.error(`${error.message}`, 3);
				return false;
			}

			if (data.pull_num > 0) {
				yield put({
					type: 'toggleNeedUpdate',
					payload: true
				})
			}
			return true;
		},
		*delete({ payload: id }, { put, select }) {
			const { data, err } = yield remove(id);
			if (!err) {
				yield message.success('成功删除消息', 2);
				yield put({ type: 'search' })
				return true;
			}
			const error = yield parseError(err);
			yield message.error(`删除消息失败：${error.message}`, 3);
			return false;
		},
	},

	reducers: {
		setAnnouncements(state, { payload }) {
			return { ...state, ...payload }
		},
		toggleNeedUpdate(state, { payload: needUpdate }) {
			return { ...state, needUpdate }
		},
		clear() {
			return initialState;
		}
	},

}
