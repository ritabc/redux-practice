import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugAssignedToDeveloper,
  getBugsByDeveloper,
  getUnresolvedBugs,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { developerAdded } from "./store/developers";
import * as actions from "./store/api";

const store = configureStore();

store.subscribe(() => {
  console.log("Store changed");
});

// store.dispatch(developerAdded({ name: "Alice" }));
// store.dispatch(developerAdded({ name: "Sally" }));
// store.dispatch(developerAdded({ name: "John" }));

// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));
// store.dispatch(bugResolved({ id: 1 }));

// // store.dispatch(projectAdded("Project 1"));
// store.dispatch(projectAdded({ name: "Project 1" }));

// console.log(store.getState());

// // const x = getUnresolvedBugs(store.getState());
// // const y = getUnresolvedBugs(store.getState());

// // True with memoization (usnig reslect library), false otherwise
// // console.log(x === y);

// store.dispatch(bugAssignedToDeveloper({ bugId: 2, developerId: 1 }));

// const bugs = getBugsByDeveloper(1)(store.getState());
// console.log(bugs);

// Example of dispatching a function
// store.dispatch((dispatch, getState) => {
//   // Call an API
//   // When the promise is received => dispatch()
//   dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
//   console.log(getState());
// });

// store.dispatch({
//   type: "error",
//   payload: { message: "An error occurred." },
// });

store.dispatch(
  actions.apiCallBegan({
    url: "/bugs",
    onSuccess: "bugs/bugsReceived", // the name of the action that should be dispatched upon success
    onError: actions.apiCallFailed.type, // Or 'bugRequestFailed'
  })
);
