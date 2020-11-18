import * as actions from "./actionTypes";

// Action creator with
export function bugAdded(description) {
  return {
    type: actions.BUG_ADDED,
    payload: {
      // Use shorthand syntax for 'property: value' where property and value have the same name
      description,
    },
  };
}

export const bugRemoved = (id) => ({
  type: actions.BUG_REMOVED,
  payload: {
    id: id,
  },
});

export function bugResolved(id) {
  return {
    type: actions.BUG_RESOLVED,
    payload: {
      id: id,
    },
  };
}
