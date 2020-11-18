import { createStore } from "redux";
import reducer from "./reducer";

// pass reducer function to createStore()
const store = createStore(reducer);

export default store;
