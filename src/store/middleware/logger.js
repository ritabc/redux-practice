// Log every action that's dispatched : kinda like redux dev tools
// Here we have a curried function with 3 parameters: store, next, and action
// action is the action that was dispatched
// next is the reference to the next middleware function. (or the reducer if there's no next middleware function)
export const logger = (store) => (next) => (action) => {
  console.log("store", store);
  console.log("next", next);
  console.log("action", action);
  // Finally, we must always call next()
  next(action);
};

export const paramaterizedLogger = (param) => (store) => (next) => (action) => {
  console.log("Logging", param);
  next(action);
};
