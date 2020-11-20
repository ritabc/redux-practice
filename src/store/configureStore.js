import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { logger, paramaterizedLogger } from "./middleware/logger";

export default function () {
  // pass reducer function to createStore()
  return configureStore({
    reducer,
    middleware: [logger, paramaterizedLogger("console")],
  });
}
