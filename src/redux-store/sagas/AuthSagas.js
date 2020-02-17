import { put, call, delay } from "redux-saga/effects";
import AuthActions from "../models/auth";
import {
  fetchLogin,
  logoutApi,
  fetchAccountInfo,
  fetchBolletiniBianchi,
  fetchPayments,
  fetchRechargeMobile,
  fetchAds,
  sendCreatedAds,
  fetchRegisterAllInfo
} from "services/auth";

// const delay = ms => new Promise(res => setTimeout(res, ms));

export function* signInByEmail(credencials) {
  const response = yield call(
    fetchLogin,
    credencials.email,
    credencials.password
  );
  if (response) {
    if (response.data) {
      localStorage.setItem("accountDataB", JSON.stringify(response.data));
      yield put(AuthActions.setAccountInfo(response.data));
    }
  }
}

export function* getAccountInfo() {}

export function* logOut() {
  const response = yield call(logoutApi);

  if (response) {
    localStorage.setItem("accountDataB", null);
    yield put(AuthActions.setAccountInfo({}));
  }
  // localStorage.setItem("accountDataB", null);
  // yield put(AuthActions.setAccountInfo({}));
}

export function* getBolletiniBianchi(params) {
  const response = yield call(
    fetchBolletiniBianchi,
    params.service_id,
    params.numero_conto_corrente,
    params.importo,
    params.intestato_a,
    params.causale,
    params.eseguito_da,
    params.via_piazza,
    params.cap,
    params.citta,
    params.provincia
  );
  if (response) {
    console.log("response", response);
    if (response.data) {
      yield put(AuthActions.setBolletiniBianchi(response.data));
    } else if (response.error) {
      console.log(
        "errorrrrrrrrrr",
        response.error.response.status,
        response.error.response.data
      );
      if (response.error.response.status === 444) {
        const error = { errors: { notCorrect: ["data are not corrected."] } };
        yield put(AuthActions.setBolletiniBianchi(error));
      } else {
        yield put(
          AuthActions.setBolletiniBianchi(response.error.response.data)
        );
      }

      // yield delay(3000);
      // yield put(AuthActions.setBolletiniBianchi({}));
    }
  }
}

export function* getPayments(params) {
  const response = yield call(
    fetchPayments,
    params.username,
    params.from,
    params.to
  );
  if (response) {
    if (response.status === 200) {
      if (response.data) {
        yield put(AuthActions.setPayments(response.data.transactions));
        if (response.data.usernames) {
          yield put(AuthActions.setUsernames(response.data.usernames));
        }
      }
    } else if (response.error) {
      if (response.error.response.status === 401) {
        yield put(AuthActions.setUnauthorization());
        const response = yield call(logoutApi);

        if (response) {
          localStorage.setItem("accountDataB", null);
          yield put(AuthActions.setAccountInfo({}));
        }
      } else {
        yield put(AuthActions.setPayments(response.error.response.data));
      }
    }
  }
}

export function* getRechargeMobile(params) {
  const response = yield call(
    fetchRechargeMobile,
    params.service_id,
    params.tel_no
  );
  if (response) {
    console.log("response", response);
    if (response.data) {
      console.log("wallet", response.data.wallet);
      if (response.data.wallet) {
      }
      yield put(AuthActions.setRechargeMobile(response.data));
    } else if (response.error) {
      if (response.error.response.status === 444) {
        const error = { errors: { notCorrect: ["dati non sono correti."] } };
        yield put(AuthActions.setRechargeMobile(error));
      } else if (response.error.response.status === 401) {
        const response = yield call(logoutApi);

        if (response) {
          localStorage.setItem("accountDataB", null);
          yield put(AuthActions.setAccountInfo({}));
        }
      } else {
        yield put(AuthActions.setRechargeMobile(response.error.response.data));
      }
    }
  }
}

export function* getAds() {
  const response = yield call(fetchAds);
  if (response.status === 200) {
    yield put(AuthActions.setAds(response.data.messages));
  }
}

export function* getRegister(params) {
  const response = yield call(
    fetchRegisterAllInfo,
    params.first_name,
    params.last_name,
    params.nickname, // for username
    params.email,
    params.gender,
    params.personal_number,
    params.birthday,
    params.nazione,
    params.province_of_birth,
    params.city_of_birth,
    params.nazioneDiResidenca,
    params.residence_province,
    params.residence_city,
    params.address,
    params.cap,
    params.identity_id,
    params.identity_type,
    params.number_prefix,
    params.number,
    params.frontImg,
    params.backImg
  );

  if (response.data) {
    yield put(AuthActions.setRegister(response.data));
    yield delay(3000);
    yield put(AuthActions.setRegister({}));
  } else if (response.error) {
    yield put(AuthActions.setRegister(response.error.response.data));
  }
}

export function* createAds({ data }) {
  let { importance, title, text } = data;
  yield put(AuthActions.createAdsResponse(true, null));
  const response = yield call(sendCreatedAds, importance, title, text);
  if (response) {
    if (response.status === 200) {
      yield put(AuthActions.createAdsResponse(false, response.data));
      yield delay(3000);
      yield put(AuthActions.createAdsResponse(false, null));
    } else {
      yield put(
        AuthActions.createAdsResponse(false, response.error.response.data)
      );
      yield delay(3000);
      yield put(AuthActions.createAdsResponse(false, null));
    }
  }
}
