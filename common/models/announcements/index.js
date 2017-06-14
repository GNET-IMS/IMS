import { message } from 'antd';
import { getAnnouncements, pullAnnouncements, removeAnnouncement } from '../../services/users';
import { create, remove } from '../../services/announcements';
import { parseError } from '../../utils/request';
import MatchPath from '../../utils/MatchPath';

const initialState = {
	announcements: [],
	pagination: {},
	current: {},
	needUpdate: false,
	showModal: false,
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
		*getAnnouncements({ payload, callback }, { call, put, select }) {
			const userId = yield select(state => state.auth.userId);
			const { data, err } = yield getAnnouncements(userId, payload);
			if (!err) {
				yield put({
					type: 'setAnnouncements',
					payload: data,
				});
				if (callback && 'function' === typeof callback) callback();
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
		*delete({ payload: announcementId }, { put, select }) {
			const userId = yield select(state => state.auth.userId);
			const { data, err } = yield removeAnnouncement({
				userId,
				announcementId
			});
			if (!err) {
				yield message.success('成功删除消息', 2);
				yield put({ type: 'getAnnouncements' })
				return true;
			}
			const error = yield parseError(err);
			yield message.error(`删除消息失败：${error.message}`, 3);
			return false;
		},
		*save({ payload }, { put, select }) {
			const userId = yield select(state => state.auth.userId);
			payload.sender_id = userId;
			payload.receiver_ids = payload.receiver_ids ? undefined : undefined
			const { data, err } = yield create(payload);
			if (!err) {
				yield message.success('发布公告成功', 2);
				return true;
			}
			const error = yield parseError(err);
			yield message.error(`发布公告失败：${error.message}`, 3);
			return false;
		},
		*show({ payload }, { put, select }) {
			yield put({
				type: 'setCurrent',
				payload
			})

			yield put({
				type: 'toggleModal',
				payload: true
			})		
		}
	},

	reducers: {
		setAnnouncements(state, { payload }) {
			return { ...state, ...payload }
		},
		setCurrent(state, { payload: current }) {
			return { ...state, current }
		},
		toggleNeedUpdate(state, { payload: needUpdate }) {
			return { ...state, needUpdate }
		},
		toggleModal(state, { payload }) {
			return { ...state, showModal: payload }
		},
		clear() {
			return initialState;
		}
	},

}
