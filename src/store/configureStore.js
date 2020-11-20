import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { logger, paramaterizedLogger } from "./middleware/logger";
import func from "./middleware/func";
import toast from "./middleware/toast";

export default function () {
  // pass reducer function to createStore()
  return configureStore({
    reducer,
    middleware: [toast, logger, paramaterizedLogger("console"), func],
  });
}
