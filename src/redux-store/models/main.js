import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getLastMinuteOdds: ["id"],
  setLastMinuteOdds: ["lastMinuteOdds"],
  toggleOverview: ["showOverview"]
});

export const MainTypes = Types;
export default Creators;

const INITIAL_STATE = {
  lastMinuteOdds: [],
  showOverview: true
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LAST_MINUTE_ODDS]: (state, { lastMinuteOdds }) => ({
    ...state,
    lastMinuteOdds
  }),
  [Types.TOGGLE_OVERVIEW]: (state, { showOverview }) => ({
    ...state,
    showOverview
  })
});
