import { createSlice } from "@reduxjs/toolkit";

let lastID = 0;

// calls redux/toolkit's createAction and createReducer (to enable us to write mutating code) functions:
// Note the actions created here will be namespaced, ie: 'bugs/bugAdded'. For example, see the Redux tab in web dev tools
const slice = createSlice({
  name: "bugs",
  initialState: [],
  // maps action to action handlers
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastID,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
    bugRemoved: (bugs, action) => {
      bugs.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer;
