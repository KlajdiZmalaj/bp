import { put, call, delay } from "redux-saga/effects";
import AuthActions from "../models/auth";
import MainActions from "../models/main";
import {
  fetchLogin,
  logoutApi,
  fetchAccountInfo,
  fetchBolletiniBianchi,
  fetchBolletiniPremercati,
  fetchPayments,
  fetchRechargeMobile,
  fetchPostePay,
  fetchAds,
  sendCreatedAds,
  fetchRegisterAllInfo,
  sendChangedPassword,
  fetchConfigura,
  fetchCodice,
  fetchBarcodeData,
  fetchUserDetails,
  updateUsers,
  changeAgentReq,
  fetchAgents,
  fetchSkinExtras,
  fetchErrors,
  deleteErrorReq,
  sendDataFormReq,
  getDataFormDetailReq,
  getTicketByTicketIdReq,
  updateDataFormReq,
  sendVisureDetailsReq,
} from "services/auth";
import { fetchUsers } from "services/main";
// const delay = ms => new Promise(res => setTimeout(res, ms));
export function* signInByEmail(credencials) {
  const response = yield call(
    fetchLogin,
    credencials.email,
    credencials.password
  );
  // console.log("response123", response);
  if (response) {
    if (response.data) {
      localStorage.setItem("accountDataB", JSON.stringify(response.data));
      yield put(AuthActions.setAccountInfo(response.data));
    }
    if (response.error) {
      yield put(AuthActions.setLoginMsg(response.error.response.data.message));
      yield delay(4000);
      yield put(AuthActions.setLoginMsg(""));
    }
  }
}
export function* getAgents() {
  const response = yield call(fetchAgents);
  // console.log("agents res", response);
  if (response.data) {
    yield put(AuthActions.setAgents(response.data.agents));
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
    // console.log("response", response);
    if (response.data) {
      yield put(AuthActions.setBolletiniBianchi(response.data));
      params.clearFields();
    } else if (response.error) {
      // console.log(
      //   "errorrrrrrrrrr",
      //   response.error.response.status,
      //   response.error.response.data
      // );
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
  if (response.error.response.status === 401) {
    localStorage.clear();
    const response = yield call(logoutApi);
  }
}

export function* getBolletiniPremercati(params) {
  const response = yield call(
    fetchBolletiniPremercati,
    params.service_id,
    params.numero_conto_corrente,
    params.importo,
    params.codice_identificativo,
    params.tipologia,
    params.eseguito_da,
    params.via_piazza,
    params.cap,
    params.citta,
    params.provincia
  );
  // console.log("response", response);

  if (response) {
    if (response.data) {
      yield put(AuthActions.setBolletiniPremercati(response.data));
      params.clearFields();
    } else if (response.error) {
      // console.log(
      //   "errorrrrrrrrrr",
      //   response.error.response.status,
      //   response.error.response.data
      // );

      if (response.error.response.status === 444) {
        const error = { errors: { notCorrect: ["data are not corrected."] } };
        yield put(AuthActions.setBolletiniPremercati(error));
      } else {
        yield put(
          AuthActions.setBolletiniPremercati(response.error.response.data)
        );
      }

      // yield delay(3000);
      // yield put(AuthActions.setBolletiniBianchi({}));
    }
  }
  if (response && response.error && response.error.response.status === 401) {
    localStorage.clear();
    const response = yield call(logoutApi);
  }
}

function* modifyAccountData(wallet) {
  const accountData = localStorage.getItem("accountDataB");
  const data = JSON.parse(accountData);

  const d = {
    ...data,
    profile: {
      ...data.profile,
      wallet: wallet,
    },
  };

  localStorage.setItem("accountDataB", JSON.stringify(d));
  yield put(AuthActions.setAccountInfo(d));

  // console.log("data", data, d);
}

export function* getPayments(params) {
  yield put(AuthActions.setPaymentsLoading(true));
  const response = yield call(
    fetchPayments,
    params.username,
    params.from,
    params.to,
    params.page_number,
    params.limit
  );
  if (response) {
    if (response.status === 200) {
      if (response.data) {
        yield put(AuthActions.setPayments(response.data.transactions));
        yield put(
          AuthActions.setPaymentsPages({
            total_pages: response.data.total_pages,
            total_records: response.data.total_records,
          })
        );

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
    yield put(AuthActions.setPaymentsLoading(false));
  }
  // console.log("response payments", response);
}

export function* getRechargeMobile(params) {
  const response = yield call(
    fetchRechargeMobile,
    params.service_id,
    params.tel_no
  );
  if (response) {
    // console.log("response", response);
    if (response.data) {
      // console.log("wallet", response.data.wallet);
      if (response.data.wallet) {
        const accountData = localStorage.getItem("accountDataB");
        const data = JSON.parse(accountData);

        const d = {
          ...data,
          profile: {
            ...data.profile,
            wallet: response.data.wallet,
          },
        };

        localStorage.setItem("accountDataB", JSON.stringify(d));
        yield put(AuthActions.setAccountInfo(d));
      }
      yield put(AuthActions.setRechargeMobile(response.data));
    } else if (response.error) {
      if (response.error.response.status === 401) {
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
  if (response && response.error && response.error.response.status === 401) {
    localStorage.clear();
    const response = yield call(logoutApi);
  }
}

export function* getPostePay(params) {
  const response = yield call(
    fetchPostePay,
    params.service_id,
    params.importo,
    params.user_id,
    params.intestazione,
    params.codice_fiscale_intestatario,
    params.ordinante,
    params.codice_fiscale_ordinante,
    params.numero_postepay,
    params.document_type,
    params.imageUrl,
    params.imageUrl2
  );
  if (response) {
    if (response.data) {
      if (response.data.wallet) {
        const accountData = localStorage.getItem("accountDataB");
        const data = JSON.parse(accountData);

        const d = {
          ...data,
          profile: {
            ...data.profile,
            wallet: response.data.wallet,
          },
        };

        localStorage.setItem("accountDataB", JSON.stringify(d));
        yield put(AuthActions.setAccountInfo(d));
      }
      yield put(AuthActions.setPostePay(response.data));
      params.clearFields();
    } else if (response.error) {
      if (response.error.response && response.error.response.status === 401) {
        const response = yield call(logoutApi);
        if (response) {
          localStorage.setItem("accountDataB", null);
          yield put(AuthActions.setAccountInfo({}));
        }
      } else {
        yield put(AuthActions.setPostePay(response.error.response.data));
      }
    }
  }
  if (response && response.error && response.error.response.status === 401) {
    localStorage.clear();
    const response = yield call(logoutApi);
  }
}

export function* getAds() {
  const response = yield call(fetchAds);
  if (response.status === 200) {
    yield put(AuthActions.setAds(response.data.messages));
    yield put(AuthActions.setPrivateMsg(response.data.private_messages));
  }
  if (response.error && response.error.response.status === 401) {
    const response = yield call(logoutApi);
    if (response) {
      localStorage.setItem("accountDataB", null);
      yield put(AuthActions.setAccountInfo({}));
    }
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
    params.backImg,
    params.role,
    params.aRagSoc,
    params.aInsegna,
    params.aPhone,
    params.aAdress,
    params.aCity,
    params.aComcode,
    params.aCap,
    params.aPiva,
    params.aFcode,
    params.confirm_password,
    params.password,
    params.rilasciato_da,
    params.luogo_di_rilascio,
    params.data_di_rilascio,
    params.data_di_scadenza,
    params.a_cordinate,
    params.a_contry,
    params.rent,
    params.privacy_policy,
    params.recieve_emails,
    params.percentage
  );

  if (response.data) {
    yield put(AuthActions.setRegister(response.data));
    yield delay(6000);
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
export function* getChangedPassword(data) {
  const response = yield call(
    sendChangedPassword,
    data.oldPassword,
    data.newPassword
  );
  if (response.message) {
    AuthActions.setChangePasswordError(response.message);
  } else {
    yield put(
      AuthActions.setChangePasswordError(response.error.response.data.errors)
    );
  }
  // console.log("ca ka responseeeee", response, response.message);
}
export function* getConfigura(data) {
  const response = yield call(fetchConfigura, data.id);
  if (response.status === 200) {
    yield put(AuthActions.setConfiguraData(response.data.user));
  } else {
    yield put(AuthActions.setConfiguraData({}));
  }
  // console.log("ca ka responseeeee configura", response);
}
export function* getCodiceTicket(data) {
  const response = yield call(fetchCodice, data.barcode, data.service);
  if (response.status === 200) {
    yield put(AuthActions.setPaymentsFromCode(response.data.payment));
  } else {
    yield put(AuthActions.setPaymentsFromCode({}));
  }
  // console.log("ca ka responseeeee codice", response);
}
export function* getBarcodeData(e) {
  const response = yield call(fetchBarcodeData, e.barcode);
  if (response.status === 200) {
    yield put(AuthActions.setBarcodeData(response.data));
    e.callback(response.data);
  } else {
    yield put(AuthActions.setBarcodeData(response.message));
    e.callback(response.data);
  }
}
export function* changeAgent(data) {
  const response = yield call(changeAgentReq, data.id, data.id2);
  if (response) {
    if (response.status === 200) {
      yield put(AuthActions.setUserDetail(response.data.user));
      const ress = yield call(fetchUsers);
      if (ress.data) {
        yield put(MainActions.setUsers(ress.data.users));
      }
    }
  }
  // console.log("response changeAgent", data, response);
}
export function* getUserDetail(data) {
  const response = yield call(fetchUserDetails, data.id);
  if (response) {
    if (response.status === 200) {
      yield put(AuthActions.setUserDetail(response.data.user));
    }
  }
  // console.log("response get users details", data, response);
}
export function* updateUserDetail(data) {
  const response = yield call(
    updateUsers,
    data.user_id,
    data.phone,
    data.document_type,
    data.document_number,
    data.rilasciato_da,
    data.luogo_di_rilascio,
    data.data_di_rilascio,
    data.data_di_scadenza,
    data.a_insegna,
    data.a_cordinate,
    data.a_phone,
    data.a_address,
    data.a_city,
    data.a_comune_code,
    data.a_cap,
    data.a_country,
    data.a_rent,
    data.password,
    data.confirm_password
  );
  if (response.data) {
    // console.log("responseresponseresponse", response);
    if (response.status === 200) {
      yield put(AuthActions.updateUserDetailMsg(response.data.message));
      const ress = yield call(fetchUsers);
      if (ress.data) {
        yield put(MainActions.setUsers(ress.data.users));
      }
      yield delay(4000);
      yield put(AuthActions.updateUserDetailMsg(""));
    }
    if (response.error) {
      yield put(
        AuthActions.updateUserDetailMsg({
          errorMsg: response.error.response.data.message,
          errors: response.error.response.data.errors,
        })
      );
      yield delay(4000);
      yield put(AuthActions.updateUserDetailMsg(""));
    }
  }
}
export function* getSkinExtras() {
  const response = yield call(fetchSkinExtras);
  if (response.data) {
    if (response.status === 200) {
      yield put(AuthActions.setSkinExtras(response.data.skin));
    }
  }
  // console.log("response skin extras", response);
}
export function* getErrors() {
  const response = yield call(fetchErrors);
  if (response.data) {
    if (response.status === 200) {
      yield put(AuthActions.setErrors(response.data?.errors));
    }
  }
  // console.log("fetchErrors", response);
}
export function* deleteError(data) {
  const response = yield call(deleteErrorReq, data.id);
  if (response.data) {
    if (response.status === 200) {
      const response = yield call(fetchErrors);
      if (response.data) {
        if (response.status === 200) {
          yield put(AuthActions.setErrors(response.data?.errors));
          data.c();
        }
      }
    }
  }
  // console.log("deleteErrorReq", response);
}

export function* sendDataForm(data) {
  const response = yield call(
    sendDataFormReq,
    data.typee,
    data.link,
    data.nome_agenzia,
    data.extra_data,
    data.bagaglio,
    data.bagaglio_stiva,
    data.partenza,
    data.partenza_stazione,
    data.andata_time,
    data.destinazione,
    data.destinazione_stazione,
    data.compagnie,
    data.adulti,
    data.ragazzi,
    data.tipologia_biglietto,
    data.ritorno_date,
    data.categoria,
    data.descrizione_categoria,
    data.quantity,
    data.name,
    data.email,
    data.telefono
  );
  if (response?.status === 200) {
    data.callBack({
      error: false,
      msg: response?.data.message,
    });
  }
  if (response.error) {
    data.callBack({
      error: true,
      msg: [
        response.error.response.data.message,
        response.error.response.data.errors
          ? Object.values(response.error.response.data.errors)
          : "error backend",
      ],
    });
  }
  // console.log("ca ka response", data, response);
}
export function* getDataFormDetails() {
  const response = yield call(getDataFormDetailReq);

  if (response.data) {
    if (response.status === 200) {
      yield put(
        AuthActions.setDataFormDetails(response.data ? response.data : null)
      );
    }
  }
  console.log("ca ka response", response);

  // console.log("fetchErrors", response);
}
export function* getTicketByTicketId(ticket_id) {
  const response = yield call(getTicketByTicketIdReq, ticket_id.ticket_id);

  if (response.data) {
    if (response.status === 200) {
      yield put(
        AuthActions.setTicketByTicketId(response.data ? response.data : null)
      );
    }
  }
  // console.log("fetchErrors", response);
}
export function* updateDataForm(data) {
  const response = yield call(
    updateDataFormReq,
    data.typee,
    data.link,
    data.nome_agenzia,
    data.extra_data,
    data.bagaglio,
    data.bagaglio_stiva,
    data.partenza,
    data.partenza_stazione,
    data.andata_time,
    data.destinazione,
    data.destinazione_stazione,
    data.compagnie,
    data.adulti,
    data.ragazzi,
    data.tipologia_biglietto,
    data.ritorno_date,
    data.categoria,
    data.descrizione_categoria,
    data.quantity,
    data.name,
    data.email,
    data.telefono,
    data.price,
    data.ticket_id
  );
  if (response?.status === 200) {
    data.callBack({
      error: false,
      msg: response?.data.message,
    });
  }
  if (response.error) {
    data.callBack({
      error: true,
      msg: [
        response.error.response.data.message,
        response.error.response.data.errors
          ? Object.values(response.error.response.data.errors)
          : "error backend",
      ],
    });
  }
  // console.log("ca ka response", data, response);
}
export function* sendVisureDetails(data) {
  const response = yield call(
    sendVisureDetailsReq,
    data.typee,
    data.codice_fiscale,
    data.provincia,
    data.address,
    data.telefono,
    data.email,
    data.nome,
    data.cognome,
    data.data_di_nascita,
    data.luogo_di_nascita,
    data.ragione_sociale,
    data.p_iva,
    data.comune
  );
  if (response?.status === 200) {
    data.callBack({
      error: false,
      msg: response?.data.message,
    });
  }
  if (response.error) {
    data.callBack({
      error: true,
      msg: [
        response.error.response.data.message,
        response.error.response.data.errors
          ? Object.values(response.error.response.data.errors)
          : "error backend",
      ],
    });
  }
}
