// Action Types
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// Action creators
export function bugAdded(description) {
  return {
    type: BUG_ADDED,
    payload: {
      // Use shorthand syntax for 'property: value' where property and value have the same name
      description,
    },
  };
}

export const bugRemoved = (id) => ({
  type: BUG_REMOVED,
  payload: {
    id: id,
  },
});

export function bugResolved(id) {
  return {
    type: BUG_RESOLVED,
    payload: {
      id: id,
    },
  };
}

let lastID = 0;

// Upon first run of reducer, state will be undefinied. In that case, we can set the default with our default '[]'
export default function reducer(state = [], action) {
  if (action.type === BUG_ADDED) {
    return [
      ...state,
      {
        id: ++lastID,
        description: action.payload.description,
        resolved: false,
      },
    ];
  } else if (action.type === BUG_REMOVED) {
    return state.filter((bug) => bug.id !== action.payload.id);
  } else if (action.type === BUG_RESOLVED) {
    return state.map((bug) =>
      // If bug.id is NOT what we received in the payload, return the bug as is. Otherwise, copy the bug and update it's resolved property
      bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
    );
  }
  return state;
}
