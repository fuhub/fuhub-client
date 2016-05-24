import _ from 'lodash';
import { API, Events } from './global';

export default function reduxCollection({
  resourceType,
  collectionName,
	getStore,
  actionPrefix = '',
}) {
	function makeActionType(t) {
		return actionPrefix ? `${actionPrefix}/t` : t;
	}

	const actionTypes = {
		set: makeActionType('set'),
		add: makeActionType('add'),
		remove: makeActionType('remove'),
	};

	function makeErrorHandler() {
		return err => {
			// TODO set error state
			console.log(err);
		};
	}

	const actionCreators = {
		// sync local actions, rarely used
		local: {
			set(items) {
				return { type: actionTypes.set, payload: items };
			},
			add(item) {
				return { type: actionTypes.add, payload: item };
			},
			remove(t) {
				const id = _.isObject(t) ? t.id : t;
				return { type: actionTypes.remove, payload: id };
			},
		},

		// async actions

		fetchAll() {
			return dispatch => {
				// TODO dispatch progress action
				API[collectionName].fetch().then(items => {
					dispatch(actionCreators.local.set(items));
				}, makeErrorHandler(dispatch));
			};
		},

		fetchOne(id) {
			return dispatch => {
				// TODO dispatch progress action
				API[resourceType](id).fetch().then(item => {
					// TODO add or select current item
					console.log(item);
				}, makeErrorHandler(dispatch));
			};
		},

		create(payload) {
			return dispatch => {
				// TODO dispatch progress action
				API[collectionName].create(payload).then(item => {
					dispatch(actionCreators.local.add(item));
				}, makeErrorHandler(dispatch));
			};
		},

		remove(id) {
			return dispatch => {
				// TODO dispatch progress action
				API[resourceType](id).remove().then(() => {
					dispatch(actionCreators.local.remove(id));
				}, makeErrorHandler(dispatch));
			};
		},

		update(item) {
			return dispatch => {
				// TODO dispatch progress action
				API[resourceType](item.id).update(item).then(updated => {
					dispatch(actionCreators.local.update(updated));
				}, makeErrorHandler(dispatch));
			};
		},
	};

	function reducer(state, action) {
		if (action.type === actionTypes.set) {
			if (!action.payload) return state;
			const value = _.isArray(action.payload) ? action.payload : [action.payload];
			return { ...state, [collectionName]: value };
		}
		if (action.type === actionTypes.add) {
			const items = _.isArray(action.payload) ? action.payload : [action.payload];
			const value = [...(state[collectionName] || []), ...items];
			return { ...state, [collectionName]: value };
		}
		if (action.type === actionTypes.remove) {
			const id = action.payload;
			const value = (state[collectionName] || []).filter(t => t.id !== id);
			return { ...state, [collectionName]: value };
		}
		if (action.type === actionTypes.update) {
			const item = action.payload;
			const value = updateItem(state[collectionName] || [], item);
			return { ...state, [collectionName]: value };
		}
		return state;
	}

	actionCreators.reducer = reducer;

	function getState() {
		return getStore().getState();
	}

	function dispatchAction(action) {
		return getStore().dispatch(action);
	}

	function getItems() {
		const state = getState();
		return state[collectionName] || [];
	}

	//
	// Event handlers
	//

	function onCreate(item) {
		const items = getItems();
		if (_.find(items, t => t.id === item.id)) return;
		dispatchAction(actionCreators.local.add(item));
	}

	function onDelete(id) {
		const items = getItems();
		if (_.find(items, t => t.id === id)) {
			dispatchAction(actionCreators.local.remove(id));
		}
	}

	function onUpdate(item) {
		const items = getItems();
		if (_.find(items, t => t.id === item.id)) {
			dispatchAction(actionCreators.local.update(item));
		}
	}

	Events.on(`${resourceType}.create`, onCreate);
	Events.on(`${resourceType}.delete`, onDelete);
	Events.on(`${resourceType}.remove`, onDelete);
	Events.on(`${resourceType}.update`, onUpdate);

	return actionCreators;
}

function updateItem(array, item) {
	const i = _.findIndex(array, t => t.id === item.id);
	if (i >= 0) {
		const result = [...array];
		result[i] = { ...result[i], ...item };
		return result;
	}
	return array;
}
