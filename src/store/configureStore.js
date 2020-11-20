import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducer";

export default function () {
  // pass reducer function to createStore()
  return configureStore({ reducer });
}
