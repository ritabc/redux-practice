import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { logger, paramaterizedLogger } from "./middleware/logger";
import toast from "./middleware/toast";
import api from "./middleware/api";

export default function () {
  // pass reducer function to createStore()
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      //   toast,
      //   logger,
      //   paramaterizedLogger("console"),
      api,
    ],
  });
}
