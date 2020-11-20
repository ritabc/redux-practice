import { configureStore } from "@reduxjs/toolkit";

import reducer from "./bugs";

export default function () {
  // pass reducer function to createStore()
  return configureStore({ reducer });
}
