import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { reducer as AuthReducer } from "./models/auth";
import { reducer as MainReducer } from "./models/main";
import rootSaga from "./sagas";

console.log("store file activated");

const rootReducer = combineReducers({
  auth: AuthReducer,
  main: MainReducer,
});

export function configureStore() {
  const loggerMiddleware = (store) => (next) => (action) => {
    const returnValue = next(action);
    // if (console.group) {
    //   console.group(action.type);
    //   console.log("%c action", "color: #03A9F4", action);
    //   console.log("%c newState", "color: #03A9F4", store.getState());
    //   console.groupEnd();
    // }
    return returnValue;
  };
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware, loggerMiddleware];
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  return {
    ...createStore(rootReducer, enhancer),
    runSaga: sagaMiddleware.run,
  };
}

export const store = configureStore();
store.runSaga(rootSaga);
window.store = store;
