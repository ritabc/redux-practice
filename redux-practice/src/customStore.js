import reducer from "./store/reducer";

function createStore(reducer) {
  let state;
  // We want to be able to have multiple listeners subscribing to our store
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    // Call the reducer to get the new state
    state = reducer(state, action);
    // Notify the subscribers
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    // Return the function as a private getter
    getState,
  };
}

export default createStore(reducer);
