// Combine different reducers here, like entitiesReducer, UIReducer, AuthReducer, etc
import { combineReducers } from "redux";
import entitiesReducer from "./entities";

export default combineReducers({
  entities: entitiesReducer,
});
