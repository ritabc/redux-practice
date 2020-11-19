import { createStore } from "redux";
import reducer from "./bugs";

export default function configureStore() {
  // pass reducer function to createStore()
  const store = createStore(
    reducer,
    // Also allow use with Chrome Extension
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
