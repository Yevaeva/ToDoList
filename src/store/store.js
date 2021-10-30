import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

const middlewareArr = [thunk];
if (process.env.NODE_ENV === "development") {
  middlewareArr.push(logger);
}

const middleware = applyMiddleware(...middlewareArr);
export const store = createStore(reducer, middleware);
