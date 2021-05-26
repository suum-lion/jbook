import { applyMiddleware, createStore, Middleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    const logger = require("redux-logger").default;
    return composeWithDevTools(applyMiddleware(...middleware, logger));
  }
  return applyMiddleware(...middleware);
};

export const store = createStore(reducers, {}, bindMiddleware([thunk]));
