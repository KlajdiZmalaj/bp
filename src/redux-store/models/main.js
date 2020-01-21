import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getServices: [],
  setServices: ["services"],
  toggleOverview: ["showOverview"]
});

export const MainTypes = Types;
export default Creators;

const INITIAL_STATE = {
  services: {},
  showOverview: true
};

export const reducer = createReducer(INITIAL_STATE, {

  [Types.TOGGLE_OVERVIEW]: (state, { showOverview }) => ({
    ...state,
    showOverview
  }),
  [Types.SET_SERVICES]: (state, { services }) => ({
    ...state,
    services
  })
});


