import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { AuthTypes } from "../models/auth";
import { MainTypes } from "../models/main";
/* ------------- Sagas ------------- */
import { signInByEmail } from "./AuthSagas";
import { getLastMinuteOdds } from "./MainSagas";

export default function* root() {
  yield all([
    // AUTH
    takeLatest(AuthTypes.SIGN_IN_BY_EMAIL, signInByEmail),

    // MAIN
    takeLatest(MainTypes.GET_LAST_MINUTE_ODDS, getLastMinuteOdds)
  ]);
}
