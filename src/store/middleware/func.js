const func = ({ dispatch, getState }) => (next) => (action) => {
  // Check the type of the action (function or object?)
  if (typeof action === "function") {
    action(dispatch, getState);
  } else {
    next(action);
  }
};

export default func;
