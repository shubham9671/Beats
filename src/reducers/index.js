import currsong from "./currsong";
import queue from "./queue";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  currsong,
  queue,
});
export default rootReducer;
