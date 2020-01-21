import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getServices: [],
  setServices: ["services"],
});

export const MainTypes = Types;
export default Creators;

const INITIAL_STATE = {
  services: {},
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SERVICES]: (state, { services }) => ({
    ...state,
    services
  })
});
