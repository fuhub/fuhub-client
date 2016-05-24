'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reduxCollection;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _global = require('./global');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function reduxCollection(_ref) {
	var resourceType = _ref.resourceType;
	var collectionName = _ref.collectionName;
	var getStore = _ref.getStore;
	var _ref$actionPrefix = _ref.actionPrefix;
	var actionPrefix = _ref$actionPrefix === undefined ? '' : _ref$actionPrefix;

	function makeActionType(t) {
		return actionPrefix ? actionPrefix + '/t' : t;
	}

	var actionTypes = {
		set: makeActionType('set'),
		add: makeActionType('add'),
		remove: makeActionType('remove')
	};

	function makeErrorHandler() {
		return function (err) {
			// TODO set error state
			console.log(err);
		};
	}

	var actionCreators = {
		// sync local actions, rarely used
		local: {
			set: function set(items) {
				return { type: actionTypes.set, payload: items };
			},
			add: function add(item) {
				return { type: actionTypes.add, payload: item };
			},
			remove: function remove(t) {
				var id = _lodash2.default.isObject(t) ? t.id : t;
				return { type: actionTypes.remove, payload: id };
			}
		},

		// async actions

		fetchAll: function fetchAll() {
			return function (dispatch) {
				// TODO dispatch progress action
				_global.API[collectionName].fetch().then(function (items) {
					dispatch(actionCreators.local.set(items));
				}, makeErrorHandler(dispatch));
			};
		},
		fetchOne: function fetchOne(id) {
			return function (dispatch) {
				// TODO dispatch progress action
				_global.API[resourceType](id).fetch().then(function (item) {
					// TODO add or select current item
					console.log(item);
				}, makeErrorHandler(dispatch));
			};
		},
		create: function create(payload) {
			return function (dispatch) {
				// TODO dispatch progress action
				_global.API[collectionName].create(payload).then(function (item) {
					dispatch(actionCreators.local.add(item));
				}, makeErrorHandler(dispatch));
			};
		},
		remove: function remove(id) {
			return function (dispatch) {
				// TODO dispatch progress action
				_global.API[resourceType](id).remove().then(function () {
					dispatch(actionCreators.local.remove(id));
				}, makeErrorHandler(dispatch));
			};
		},
		update: function update(item) {
			return function (dispatch) {
				// TODO dispatch progress action
				_global.API[resourceType](item.id).update(item).then(function (updated) {
					dispatch(actionCreators.local.update(updated));
				}, makeErrorHandler(dispatch));
			};
		}
	};

	function reducer(state, action) {
		if (action.type === actionTypes.set) {
			if (!action.payload) return state;
			var value = _lodash2.default.isArray(action.payload) ? action.payload : [action.payload];
			return _extends({}, state, _defineProperty({}, collectionName, value));
		}
		if (action.type === actionTypes.add) {
			var items = _lodash2.default.isArray(action.payload) ? action.payload : [action.payload];
			var _value = [].concat(_toConsumableArray(state[collectionName] || []), _toConsumableArray(items));
			return _extends({}, state, _defineProperty({}, collectionName, _value));
		}
		if (action.type === actionTypes.remove) {
			var _ret = function () {
				var id = action.payload;
				var value = (state[collectionName] || []).filter(function (t) {
					return t.id !== id;
				});
				return {
					v: _extends({}, state, _defineProperty({}, collectionName, value))
				};
			}();

			if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
		}
		if (action.type === actionTypes.update) {
			var item = action.payload;
			var _value2 = updateItem(state[collectionName] || [], item);
			return _extends({}, state, _defineProperty({}, collectionName, _value2));
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
		var state = getState();
		return state[collectionName] || [];
	}

	//
	// Event handlers
	//

	function onCreate(item) {
		var items = getItems();
		if (_lodash2.default.find(items, function (t) {
			return t.id === item.id;
		})) return;
		dispatchAction(actionCreators.local.add(item));
	}

	function onDelete(id) {
		var items = getItems();
		if (_lodash2.default.find(items, function (t) {
			return t.id === id;
		})) {
			dispatchAction(actionCreators.local.remove(id));
		}
	}

	function onUpdate(item) {
		var items = getItems();
		if (_lodash2.default.find(items, function (t) {
			return t.id === item.id;
		})) {
			dispatchAction(actionCreators.local.update(item));
		}
	}

	_global.Events.on(resourceType + '.create', onCreate);
	_global.Events.on(resourceType + '.delete', onDelete);
	_global.Events.on(resourceType + '.remove', onDelete);
	_global.Events.on(resourceType + '.update', onUpdate);

	return actionCreators;
}

function updateItem(array, item) {
	var i = _lodash2.default.findIndex(array, function (t) {
		return t.id === item.id;
	});
	if (i >= 0) {
		var result = [].concat(_toConsumableArray(array));
		result[i] = _extends({}, result[i], item);
		return result;
	}
	return array;
}