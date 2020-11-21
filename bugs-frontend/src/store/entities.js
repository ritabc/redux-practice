import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";
import developersReducer from "./developers";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  developers: developersReducer,
});
