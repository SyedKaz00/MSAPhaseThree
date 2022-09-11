import counter from "./counterReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter,
});
export default allReducers;