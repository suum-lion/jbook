import { combineReducers } from "redux";
import bundlesReducer from "./bundlesReducer";
import cellsReducer from "./cellsReducer";
import sourceReducer from "./sourcesReducer";

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
  sources: sourceReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
