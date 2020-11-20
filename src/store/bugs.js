import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastID = 0;

// calls redux/toolkit's createAction and createReducer (to enable us to write mutating code) functions:
// Note the actions created here will be namespaced, ie: 'bugs/bugAdded'. For example, see the Redux tab in web dev tools
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false, // When true, UI will display loading icon
    lastFetch: null, // timestamp of last time we called the server to get list of bugs. This is useful if we want to implement time-based caching
  },
  // maps action to action handler
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastID,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
    bugAssignedToDeveloper: (bugs, action) => {
      const { bugId, developerId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].developerId = developerId;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
    },
  },
});

export const {
  bugAdded,
  bugResolved,
  bugRemoved,
  bugAssignedToDeveloper,
} = slice.actions;
export default slice.reducer;

// Selector Function - without memoization
// export const getUnresolvedBugs = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolved);

// Create selector with memoization
export const getUnresolvedBugs = createSelector(
  // The input functions are here
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  // The selector function here will be calculated iff the input (in this case bugs & projects) are the same
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByDeveloper = (developerId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.developerId === developerId)
  );
