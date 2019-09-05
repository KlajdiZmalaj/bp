import { createSelector } from "reselect";

export const toggleOverviewSelector = createSelector(
  state => state.main.showOverview,
  showOverview => showOverview
);
