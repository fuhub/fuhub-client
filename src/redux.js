import _ from 'lodash';
import { API, Events } from './global';

export default function reduxCollection({
  resourceType,
  collectionName,
  getStore,
  extend,
  selectedKey = '',
  actionPrefix = '',
}) {
  function makeActionType(t) {
    return actionPrefix ? `${actionPrefix}/${t.toUpperCase()}` : t.toUpperCase();
  }

  const actionTypes = {
    init: makeActionType('init'),
    add: makeActionType('add'),
    remove: makeActionType('remove'),
    select: makeActionType('select'),
    set: makeActionType('set'),
  };

  function makeErrorHandler() {
    return err => {
      // TODO set error state
      console.log(err);
    };
  }

  let actionCreators = {
    // sync local actions, it should be rarely used
    local: {
      init(items) {
        return { type: actionTypes.init, payload: items };
      },
      add(item) {
        return { type: actionTypes.add, payload: item };
      },
      remove(t) {
        const id = _.isObject(t) ? t.id : t;
        return { type: actionTypes.remove, payload: id };
      },
      select(item) {
        return { type: actionTypes.select, payload: item };
      },
      // general purpose action, it should be rarely used
      set(key, value) {
        return { type: actionTypes.set, payload: { key, value } };
      },
    },

    // async actions

    fetchAll() {
      return dispatch => {
        // TODO dispatch progress action
        API[collectionName].fetch().then(items => {
          dispatch(actionCreators.local.init(items));
        }, makeErrorHandler(dispatch));
      };
    },

    fetchOne(id) {
      return dispatch => {
        // TODO dispatch progress action
        API[resourceType](id).fetch().then(item => {
          dispatch(actionCreators.local.select(item));
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
    if (action.type === actionTypes.init) {
      if (!action.payload) return state;
      const value = _.isArray(action.payload) ? action.payload : [action.payload];
      return { ...state, [collectionName]: value };
    }
    if (action.type === actionTypes.add) {
      // update item if it already exists
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
    if (action.type === actionTypes.select) {
      const key = selectedKey || `current${_.capitalize(resourceType)}`;
      const item = action.payload;
      let items = state[collectionName] || [];
      const i = indexOf(items, item.id);
      if (i >= 0) {
        items = [...items];
        items[i] = item;
      }
      return { ...state, [collectionName]: items, [key]: item };
    }
    // general purpose action, it should be rarely used
    if (action.type === actionTypes.set) {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    }
    return state;
  }

  actionCreators.reducer = reducer;
  actionCreators.actionTypes = actionTypes;

  if (_.isFunction(extend)) {
    actionCreators = extend(actionCreators);
  }

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
    if (indexOf(items, item.id)) {
      dispatchAction(actionCreators.local.update(item));
    } else {
      dispatchAction(actionCreators.local.add(item));
    }
  }

  function onDelete(id) {
    const items = getItems();
    if (indexOf(items, id) >= 0) {
      dispatchAction(actionCreators.local.remove(id));
    }
  }

  function onUpdate(item) {
    const items = getItems();
    if (indexOf(items, item.id) >= 0) {
      dispatchAction(actionCreators.local.update(item));
    }
  }

  Events.on(`${resourceType}.create`, onCreate);
  Events.on(`${resourceType}.delete`, onDelete);
  Events.on(`${resourceType}.remove`, onDelete);
  Events.on(`${resourceType}.update`, onUpdate);

  return actionCreators;
}

function indexOf(array, id) {
  return _.findIndex(array || [], t => t.id === id);
}

function updateItem(array, item) {
  const i = indexOf(array, item.id);
  if (i >= 0) {
    const result = [...array];
    result[i] = { ...result[i], ...item };
    return result;
  }
  return array;
}
