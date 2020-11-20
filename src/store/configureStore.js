import { configureStore } from "@reduxjs/toolkit";

import reducer from "./projects";

export default function () {
  // pass reducer function to createStore()
  return configureStore({ reducer });
}
