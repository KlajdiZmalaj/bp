import { put, call, delay, select } from "redux-saga/effects";
import AuthActions, { AuthTypes } from "../models/auth";
import MainActions from "../models/main";
import {
  fetchLogin,
  logoutApi,
  // fetchAccountInfo,
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
  getVisureReq,
  updateDataFormReq,
  getDataFormDetailActivesReq,
  sendVisureDetailsReq,
  getVisureByVisureIdReq,
  updateVisuraReq,
  getAgentByUserIdReq,
  getUserByUserIdReq,
  getSkinsReq,
  getFaturaDetailsReq,
  getAllFaturaBySearchReq,
  getAllServicesReq,
  sendMailFatturaReq,
  printFatturaReq,
  AddSkinReq,
  widgetPaymentsReq,
  AddExtraDataReq,
  AddSuperAdminReq,
  getStatisticheReq,
  ServiceChangeStatusReq,
} from "services/auth";
import { fetchUsers } from "services/main";
import { notification } from "antd";
import { param } from "jquery";
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
      credencials.c(response.data.profile);
    }
    if (response.error) {
      yield put(AuthActions.setLoginMsg(response.error.response.data.message));
      yield delay(4000);
      yield put(AuthActions.setLoginMsg(""));
    }
  }
}
export function* getAgents(params) {
  let response;
  if (params?.skin_id && params?.skin_id != -1) {
    response = yield call(fetchAgents, params.skin_id);
  } else {
    response = yield call(fetchAgents);
  }
  // console.log("agents res", response);
  if (response.data) {
    yield put(AuthActions.setAgents(response.data.agents));
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}

export function* getAccountInfo() {}

export function* logOut() {
  const response = yield call(logoutApi);

  if (response) {
    localStorage.setItem("accountDataB", {});
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
      if (response.error.response.status === 444) {
        const error = { errors: { notCorrect: ["data are not corrected."] } };
        yield put(AuthActions.setBolletiniBianchi(error));
      } else {
        yield put(
          AuthActions.setBolletiniBianchi(response.error.response.data)
        );
      }
    }
    if (response.error && response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
    params.callBack(false);
  }
}
export function* addTicket({ ticket }) {
  const my_tickets = yield select((state) => state.auth.formDetails.my_tickets);
  let tickets = yield select((state) => state.auth.formDetails.tickets);
  yield put(
    AuthActions.setDataFormDetails({
      my_tickets,
      tickets: tickets ? [...tickets, ticket] : [ticket],
    })
  );
}
export function* addVisure({ singleVisure }) {
  const my_visure = yield select((state) => state.auth.Visure.my_visure);
  let visure = yield select((state) => state.auth.Visure.visure);

  yield put(
    AuthActions.setVisure({
      my_visure,
      visure: visure ? [...visure, singleVisure] : visure,
    })
  );
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
      if (response.error.response.status === 444) {
        const error = { errors: { notCorrect: ["data are not corrected."] } };
        yield put(AuthActions.setBolletiniPremercati(error));
      } else {
        yield put(
          AuthActions.setBolletiniPremercati(response.error.response.data)
        );
      }
      if (
        response &&
        response.error &&
        response.error.response.status === 401
      ) {
        const response = yield call(logoutApi);

        if (response) {
          localStorage.setItem("accountDataB", null);
          yield put(AuthActions.setAccountInfo({}));
        }
        // const response = yield call(logoutApi);
      }
    }
    if (params.callBack) {
      params.callBack(false);
    }
  }
}

// function* modifyAccountData(wallet) {
//   const accountData = localStorage.getItem("accountDataB");
//   const data = JSON.parse(accountData);

//   const d = {
//     ...data,
//     profile: {
//       ...data.profile,
//       wallet: wallet,
//     },
//   };

//   localStorage.setItem("accountDataB", JSON.stringify(d));
//   yield put(AuthActions.setAccountInfo(d));

//   // console.log("data", data, d);
// }

export function* getPaymentsForExcel(params) {
  yield put(AuthActions.setPaymentsExcelLoading(true));
  const response = yield call(
    fetchPayments,
    params.username,
    params.from,
    params.to,
    params.page_number,
    params.limit,
    params.skin_id,
    params.excel
  );
  if (response) {
    if (response.status === 200) {
      if (response.data) {
        yield put(AuthActions.setPaymentsForExcel(response.data.transactions));
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
  yield put(AuthActions.setPaymentsExcelLoading(false));

  // console.log("response payments", response);
}
export function* getPayments(params) {
  yield put(AuthActions.setPaymentsLoading(true));
  const response = yield call(
    fetchPayments,
    params.username,
    params.from,
    params.to,
    params.page_number,
    params.limit,
    params.skin_id,
    params.excel
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
        if (response.data.balance) {
          yield put(MainActions.setOverviewDashboard(response.data.balance));
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
  yield put(AuthActions.setPaymentsLoading(false));
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
    //set loading false
    params.callBack(false);
  }
  if (response && response.error && response.error.response.status === 401) {
    yield put(AuthActions.setUnauthorization());
    const response = yield call(logoutApi);

    if (response) {
      localStorage.setItem("accountDataB", null);
      yield put(AuthActions.setAccountInfo({}));
    }
    // const response = yield call(logoutApi);
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
    params.setPostePayLoading(false);
  }
  if (response && response.error && response.error.response.status === 401) {
    localStorage.clear();
    // const response = yield call(logoutApi);
  }
}

export function* getAds() {
  const response = yield call(fetchAds);
  if (response.status === 200) {
    yield put(AuthActions.setAds(response.data.messages));
    yield put(
      AuthActions.setPrivateMsg(
        response.data.ticket_messages
          ? [
              ...response.data.private_messages,
              ...response.data.ticket_messages,
            ]
          : response.data.private_messages
      )
    );
  }
  if (response.error && response.error?.response?.status === 401) {
    const response = yield call(logoutApi);
    if (response) {
      localStorage.setItem("accountDataB", null);
      yield put(AuthActions.setAccountInfo({}));
    }
  }
}

export function* addPrivateMsg(msg) {
  let allMsgs = yield select((state) => {
    return state.auth.privMsg;
  });
  yield put(AuthActions.setPrivateMsg([...allMsgs, msg.privMsg]));
  // console.log("called addprivate", allMsgs, msg);
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
  let response;
  if (data?.skin_id && data?.skin_id != -1) {
    response = yield call(changeAgentReq, data.id, data.id2, data.skin_id);
  } else {
    response = yield call(changeAgentReq, data.id, data.id2);
  }
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
  const response = yield call(fetchUserDetails, data.id, data.skin_id);
  if (response) {
    if (response.status === 200) {
      yield put(AuthActions.setUserDetail(response.data.user));
    }
  }
  // console.log("response get users details", data, response);
}
export function* updateUserDetail(data) {
  let response;
  if (data?.skin_id && data?.skin_id != -1) {
    response = yield call(
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
      data.confirm_password,
      data.skin_id
    );
  } else {
    response = yield call(
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
  }
  if (response.data) {
    console.log(response);
    if (response.status === 200) {
      notification["success"]({
        message: "Azione completata",
        description: response.data.message,
      });
      const ress = yield call(fetchUsers);
      if (ress.data) {
        yield put(MainActions.setUsers(ress.data.users));
      }
      yield delay(4000);
      yield put(AuthActions.updateUserDetailMsg(""));
    }
    data.resetState();
  }
  if (response.error) {
    notification["error"]({
      message: response.error.response.data.message,
      description: [
        response.error.response.data.message,
        response.error.response.data.errors
          ? Object.values(response.error.response.data.errors)
          : "error backend",
      ],
    });

    yield delay(4000);
    yield put(AuthActions.updateUserDetailMsg(""));
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
}
export function* getDataFormDetailsActives(data) {
  const response = yield call(getDataFormDetailActivesReq, data.isVisure);

  if (response.data) {
    if (response.status === 200) {
      const activeTickets = yield select(
        (state) => state.auth.formDetailsActives.rowsTickets
      );
      const activeVisure = yield select(
        (state) => state.auth.formDetailsActives.rowsVisure
      );

      if (data.isVisure) {
        yield put(
          AuthActions.setDataFormDetailsActives({
            rowsVisure: response.data.visure,
            rowsTickets: [...activeTickets],
          })
        );
      } else {
        yield put(
          AuthActions.setDataFormDetailsActives({
            rowsVisure: [...activeVisure],
            rowsTickets: response.data.tickets,
          })
        );
      }
    }
  }
}
export function* getTicketByTicketId(ticket_id) {
  const response = yield call(getTicketByTicketIdReq, ticket_id.ticket_id);

  if (response.data) {
    if (response.status === 200) {
      yield put(AuthActions.setTicketByTicketId(response.data.data));
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
  if (response?.status === 401) {
    const response = yield call(logoutApi);
    if (response) {
      localStorage.setItem("accountDataB", null);
      yield put(AuthActions.setAccountInfo({}));
    }
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
    data.comune,
    data.servizi,
    data.price,
    data.sc
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
export function* getVisure() {
  const response = yield call(getVisureReq);

  if (response.data) {
    if (response.status === 200) {
      yield put(AuthActions.setVisure(response.data));
    }
  }
  // console.log("fetchErrors", response);
}
export function* getVisureByVisureId(visura_id) {
  const response = yield call(getVisureByVisureIdReq, visura_id);

  if (response.data) {
    if (response.status === 200) {
      yield put(AuthActions.setVisureByVisureId(response.data.data));
    }
  }
}

export function* updateVisura(data) {
  const response = yield call(
    updateVisuraReq,
    //same
    data.visura_id,
    data.typee,
    data.codice_fiscale,
    data.provincia,
    data.address,
    data.telefono,
    data.email,
    data.price,
    //type2
    data.ragione_sociale,
    data.p_iva,
    data.comune,
    //type1
    data.nome,
    data.cognome,
    data.data_di_nascita,
    data.luogo_di_nascita,
    data.servizi
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
export function* getAgentByUserId(data) {
  const response = yield call(getAgentByUserIdReq, data.user_id, data.skin_id);

  if (response.data) {
    if (response.status === 200) {
      yield put(AuthActions.setUserDetail(response.data.user));
    }
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}
export function* getUserByUserId(data) {
  const response = yield call(getUserByUserIdReq, data.user_id, data.skin_id);

  if (response.data) {
    if (response.status === 200) {
      yield put(AuthActions.setUserDetail(response.data.user));
    }
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}
export function* getSkins() {
  const response = yield call(getSkinsReq);

  if (response.data) {
    if (response.status === 200) {
      yield put(AuthActions.setSkins(response.data.users));
    }
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}
export function* getFaturaDetails(params) {
  const response = yield call(
    getFaturaDetailsReq,
    params.user_id,
    params.year,
    params.month
  );
  if (response.data) {
    if (response.status === 200) {
      yield put(AuthActions.setFaturaDetails(response.data));
    }
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}
export function* getAllServices({ skin_id }) {
  yield put(AuthActions.setServicesLoading(true));
  const response = yield call(getAllServicesReq, skin_id);
  if (response.data) {
    if (response.status === 200) {
      yield put(AuthActions.setAllServices(response.data.result));
    }
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
  yield put(AuthActions.setServicesLoading(false));
}
export function* getAllFaturaBySearch({ username, year, month }) {
  const response = yield call(getAllFaturaBySearchReq, username, year, month);
  if (response.data) {
    let FatturaArray = [];
    Object.keys(response.data.fatture).map((fatureKey) => {
      FatturaArray.push(response.data.fatture[fatureKey]);
    });
    if (response.status === 200) {
      yield put(
        AuthActions.setAllFaturaBySearch({
          FaturaDetails: FatturaArray,
          Users: response.data?.usernames && response.data?.usernames,
        })
      );
    }
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}
export function* sendMailFattura({ file_name }) {
  const response = yield call(sendMailFatturaReq, file_name);
  if (response) {
    notification["success"]({
      message: "Azione completata",
      description: response.data.message,
      placement: "bottomRight",
    });
  }
}
export function* AddSkinNew({ name, url, email, agency_rent }) {
  const response = yield call(AddSkinReq, name, url, email, agency_rent);

  if (response) {
    // console.log(response.data.skin_id);
    yield put(AuthActions.setSkinId(response.data.skin_id));
    yield put(AuthActions.registerSkinSucc({ addSkinSucc: true }));
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}
export function* getWidgetPayments({ skin_id }) {
  console.log(skin_id);
  const response = yield call(widgetPaymentsReq, skin_id);
  if (response.data) {
    yield put(AuthActions.setWidgetPayments(response.data.payments));
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
  // console.log("response wiget payments", response);
}
export function* AddSuperAdmin({
  first_name,
  last_name,
  gender,
  username,
  email,
  phone,
  personal_number,
  password,
  confirm_password,
  address,
  city,
  comune_code,
  cap,
  country,
  birth_place,
  birth_country,
  birthday,
  a_ragione_sociale,
  a_p_iva,
  a_codice_fiscale,
  skin_id,
  c,
}) {
  const response = yield call(
    AddSuperAdminReq,
    first_name,
    last_name,
    gender,
    username,
    email,
    phone,
    personal_number,
    password,
    confirm_password,
    address,
    city,
    comune_code,
    cap,
    country,
    birth_place,
    birth_country,
    birthday,
    a_ragione_sociale,
    a_p_iva,
    a_codice_fiscale,
    skin_id
  );
  if (response) {
    yield call(c);
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}
export function* AddExtraData({
  cel,
  mail,
  address,
  link1,
  link2,
  link3,
  link4,
  link5,
  ig,
  pin,
  yt,
  fb,
  bank_name,
  account_name,
  iban,
  main_color,
  skin_id,
}) {
  const response = yield call(
    AddExtraDataReq,
    cel,
    mail,
    address,
    link1,
    link2,
    link3,
    link4,
    link5,
    ig,
    pin,
    yt,
    fb,
    bank_name,
    account_name,
    iban,
    main_color,
    skin_id
  );
  if (response) {
    yield put(AuthActions.registerSkinSucc({ addExtraDataSucc: true }));
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}
export function* getStatistiche(params) {
  const response = yield call(getStatisticheReq, params.skin_id);
  if (response) {
    yield put(AuthActions.setStatistiche(response.data));
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}
export function* UpdateServiceChangeStatus(params) {
  const response = yield call(
    ServiceChangeStatusReq,
    params.name,
    params.full_name,
    params.company_id,
    params.active,
    params.skin_id
  );
  if (response) {
    yield call(params.c);
  }
  if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}
