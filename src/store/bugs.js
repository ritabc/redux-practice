import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

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
    // an event (bugAdded) (as opposed to addBug, with is a command)
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      console.log(bugs.list);
      bugs.list[index].resolved = true;
    },
    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
    bugAssignedToDeveloper: (bugs, action) => {
      console.log(action.payload);
      const { id: bugId, developerId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = developerId;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
  },
});

// Only command-notions (the ones that call apiCallBegan) should be updated
const {
  bugAdded,
  bugResolved,
  bugRemoved,
  bugAssignedToDeveloper,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

const url = "/bugs";

// Action creator
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;
  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

// a command (addBug) (as opposed to bugAdded, with is an event)
export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (bugId) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    method: "patch",
    data: {
      resolved: true,
    },
    onSuccess: bugResolved.type,
  });

export const assignBugToDeveloper = (bugId, developerId) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    method: "patch",
    data: { developerId },
    onSucces: bugAssignedToDeveloper.type,
  });
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
