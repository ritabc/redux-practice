import * as actions from "./actionTypes";

// // Design State:
// [
//     {
//         id: 1,
//         description: "bug description",
//         resolved: false
//     },
//     {...},
//     ...
// ]

// // Define actions
// // Actions should only the minimal information necessary. In this case it wouldn't make sense to add the resolved or id properties to the payload.
// {
//     type: "bugAdded",
//     payload: {
//         description: "bug description",
//     }
// }

let lastID = 0;

// Upon first run of reducer, state will be undefinied. In that case, we can set the default with our default '[]'
export default function reducer(state = [], action) {
  if (action.type === actions.BUG_ADDED) {
    return [
      ...state,
      {
        id: ++lastID,
        description: action.payload.description,
        resolved: false,
      },
    ];
  } else if (action.type === actions.BUG_REMOVED) {
    return state.filter((bug) => bug.id !== action.payload.id);
  } else if (action.type === actions.BUG_RESOLVED) {
    // One way
    // let index = state.findIndex((bug) => bug.id === action.payload.id);
    // let resolvedBug = Object.assign({}, state[index]);
    // resolvedBug.resolved = true;
    // return [...state.slice(0, index), resolvedBug, ...state.slice(index + 1)];
    // A more concise way
    return state.map((bug) =>
      // If bug.id is NOT what we received in the payload, return the bug as is. Otherwise, copy the bug and update it's resolved property
      bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
    );
  }
  return state;
}
