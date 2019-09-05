import { put, call } from "redux-saga/effects";
import MainActions from "../models/main";

import { fetchLastMinuteOdds } from "services/main";

export function* getLastMinuteOdds({ id }) {
  const response = yield call(fetchLastMinuteOdds, id);
  yield put(MainActions.setLastMinuteOdds(response.data));
}
