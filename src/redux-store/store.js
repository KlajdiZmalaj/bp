import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import { reducer as AuthReducer } from "./models/auth";
import { reducer as MainReducer } from "./models/main";

const rootReducer = combineReducers({
  auth: AuthReducer,
  main: MainReducer,
});

export default function configureStore() {
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

  return {
    ...createStore(rootReducer, applyMiddleware(...middlewares)),
    runSaga: sagaMiddleware.run,
  };
}
