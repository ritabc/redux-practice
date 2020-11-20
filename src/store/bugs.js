import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
export const bugAdded = createAction("bugAdded");
export const bugRemoved = createAction("bugRemoved");
export const bugResolved = createAction("bugResolved");

// Can write mutating code here: Redux toolkit will use immer to convert the code to non-mutating code behind the scenes
export default createReducer([], {
  // actions: functions
  // bugAdded here must be the same as name in action Created
  [bugAdded.type]: (bugs, action) => {
    bugs.push({
      id: ++lastID,
      description: action.payload.description,
      resolved: false,
    });
  },
  [bugResolved.type]: (bugs, action) => {
    const index = bugs.findIndex((bug) => bug.id === action.payload.id);
    bugs[index].resolved = true;
  },
  [bugRemoved.type]: (bugs, action) => {
    bugs.filter((bug) => bug.id !== action.payload.id);
  },
});

let lastID = 0;

// Upon first run of reducer, state will be undefinied. In that case, we can set the default with our default '[]'
// export default function reducer(state = [], action) {
//   if (action.type === bugAdded.type) {
//     return [
//       ...state,
//       {
//         id: ++lastID,
//         description: action.payload.description,
//         resolved: false,
//       },
//     ];
//   } else if (action.type === bugRemoved.type) {
//     return state.filter((bug) => bug.id !== action.payload.id);
//   } else if (action.type === bugResolved.type) {
//     return state.map((bug) =>
//       // If bug.id is NOT what we received in the payload, return the bug as is. Otherwise, copy the bug and update it's resolved property
//       bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
//     );
//   }
//   return state;
// }
