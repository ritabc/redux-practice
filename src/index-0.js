import store from "./store";
import * as actions from "./actionTypes";
import { bugAdded, bugRemoved, bugResolved } from "./actions";

// Subscribe to the store
// Pass a function that gets run every time the state of the store changes
// The subscribe function returns a function to unsubscribe to the store.
/// It is important to unsubscribe always: what if the user navigates away from the component which subscribes to the store?
const unsubscribe = store.subscribe(() => {
  // This is where we'd work with the DOM in a vanilla JS app, or rerender with React, etc.
  // UI components should subscribe to the store so they get notified when the state of the store changes
  console.log("Store changed!", store.getState());
});

// Pass an action - add a bug
store.dispatch(bugAdded("Bug 1"));

// If the component that subscribed is not going to be visible, we should unsubscribe in order to prevent memory leaks
unsubscribe();

// Pass an action - remove a bug
// store.dispatch(bugRemoved(1));

// Update a bug - resolve it
store.dispatch(bugResolved(1));

console.log(store.getState());
