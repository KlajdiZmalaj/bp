import { put, call, delay, select } from "redux-saga/effects";
import AuthActions from "../models/auth";
import MainActions from "../models/main";
import * as AuthRequest from "services/auth";
//import { fetchUsers } from "services/main";
import { notification } from "antd";
export function* signInByEmail(credencials) {
  const response = yield call(
    AuthRequest.fetchLogin,
    credencials.email,
    credencials.password
  );

  if (response) {
    if (response?.data) {
      localStorage.setItem("accountDataB", JSON.stringify(response?.data));
      yield put(AuthActions.setAccountInfo(response?.data));
      credencials.c(response?.data.profile);
    }
    if (response?.error) {
      yield put(
        AuthActions.setLoginMsg(response?.error.response?.data.message)
      );
      yield delay(4000);
      yield put(AuthActions.setLoginMsg(""));
    }
  }
}
export function* getAgents(params) {
  let response;
  if (params?.skin_id && params?.skin_id !== -1) {
    response = yield call(AuthRequest.fetchAgents, params.skin_id);
  } else {
    response = yield call(AuthRequest.fetchAgents);
  }
  if (response?.data) {
    yield put(AuthActions.setAgents(response?.data.agents));
  }
}

export function* getAccountInfo() {}

export function* logOut() {
  const response = yield call(AuthRequest.logoutApi);

  if (response) {
    localStorage.setItem("accountDataB", {});
    yield put(AuthActions.setAccountInfo({}));
  }
}

export function* getBolletiniBianchi(params) {
  const response = yield call(
    AuthRequest.fetchBolletiniBianchi,
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
  if (response?.data) {
    if (response?.data) {
      yield put(AuthActions.setBolletiniBianchi(response?.data));
      params.clearFields();
    } else if (response?.error) {
      if (response?.error.response?.status === 444) {
        const error = { errors: { notCorrect: ["data are not corrected."] } };
        yield put(AuthActions.setBolletiniBianchi(error));
      } else {
        yield put(
          AuthActions.setBolletiniBianchi(response?.error.response?.data)
        );
      }
    }
  }
  if (response && params.callBack) {
    params.callBack(false);
  }
}
export function* addTicket({ ticket }) {
  const my_tickets = yield select((state) => state.auth.formDetails.my_tickets);
  let tickets = yield select((state) => state.auth.formDetails.tickets);
  yield put(
    AuthActions.setDataFormDetails({
      my_tickets,
      tickets: tickets ? [ticket, ...tickets] : [ticket],
    })
  );
}

export function* pagoTicket({ barcode }) {
  notification["info"]({
    key: "PaymentLoading",
    duration: 0,
    message: "Attendere, transazione in corso",
  });
  const response = yield call(AuthRequest.pagoTicketReq, barcode);

  if (response) {
    if (response?.data) {
      notification.close("PaymentLoading");
      yield put(AuthActions.setBolletiniBianchi(response?.data));
      notification["success"]({
        message: response?.data.message,
      });
      if (response?.data.wallet) {
        const accountData = localStorage.getItem("accountDataB");
        const data = JSON.parse(accountData);

        const d = {
          ...data,
          profile: {
            ...data.profile,
            wallet: response?.data.wallet,
          },
        };

        localStorage.setItem("accountDataB", JSON.stringify(d));
        yield put(AuthActions.setAccountInfo(d));
      }
    } else if (response?.error) {
      notification.close("PaymentLoading");
    }
  }
  notification.close("PaymentLoading");
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
    AuthRequest.fetchBolletiniPremercati,
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
    if (response?.data) {
      yield put(AuthActions.setBolletiniPremercati(response?.data));
      params.clearFields();
    } else if (response?.error) {
      if (response?.error.response?.status === 444) {
        const error = { errors: { notCorrect: ["data are not corrected."] } };
        yield put(AuthActions.setBolletiniPremercati(error));
      } else {
        yield put(
          AuthActions.setBolletiniPremercati(response?.error.response?.data)
        );
      }
    }
    if (params.callBack) {
      params.callBack(false);
    }
  }
}

export function* getPaymentsForExcel(params) {
  yield put(AuthActions.setPaymentsExcelLoading(true));
  const response = yield call(
    AuthRequest.fetchPayments,
    params.username,
    params.from,
    params.to,
    params.page_number,
    params.limit,
    params.skin_id,
    params.excel
  );
  if (response) {
    if (response?.status === 200) {
      if (response?.data) {
        yield put(AuthActions.setPaymentsForExcel(response?.data.transactions));
      }
    } else if (response?.error) {
      yield put(AuthActions.setPayments(response?.error.response?.data));
    }
  }
  yield put(AuthActions.setPaymentsExcelLoading(false));

  // console.log("response payments", response);
}
export function* getPayments(params) {
  yield put(AuthActions.setPaymentsLoading(true));
  const response = yield call(
    AuthRequest.fetchPayments,
    params.username,
    params.from,
    params.to,
    params.page_number,
    params.limit,
    params.skin_id,
    params.excel
  );
  if (response) {
    if (response?.status === 200) {
      if (response?.data) {
        yield put(AuthActions.setPayments(response?.data.transactions));
        yield put(
          AuthActions.setPaymentsPages({
            total_pages: response?.data.total_pages,
            total_records: response?.data.total_records,
          })
        );
        const stats = yield select((state) => state.auth.StatisticheMain);

        yield put(
          AuthActions.setStatisticheMain({
            ...stats,
            total: {
              commissioni: response?.data?.balance?.commissione,
              proviggioni: response?.data?.balance?.proviggioni,
              transazioni: response?.data?.balance?.saldo,
            },
          })
        );

        if (response?.data.usernames) {
          yield put(AuthActions.setUsernames(response?.data.usernames));
        }
        if (response?.data.balance) {
          yield put(MainActions.setOverviewDashboard(response?.data.balance));
        }
      }
    } else if (response?.error) {
      yield put(AuthActions.setPayments(response?.error.response?.data));
    }
  }
  yield put(AuthActions.setPaymentsLoading(false));
  // console.log("response payments", response);
}
export function* getRefills({ page_number, limit }) {
  yield put(AuthActions.setPaymentsLoading(true));
  const response = yield call(AuthRequest.fetchRefills, page_number, limit);
  if (response?.status === 200) {
    if (response?.data) {
      yield put(AuthActions.setPayments(response?.data.transactions));
      yield put(
        AuthActions.setPaymentsPages({
          total_pages: response?.data.total_pages,
          total_records: response?.data.total_records,
        })
      );

      if (response?.data.usernames) {
        yield put(AuthActions.setUsernames(response?.data.usernames));
      }
      if (response?.data.balance) {
        yield put(MainActions.setOverviewDashboard(response?.data.balance));
      }
    }
  }
  yield put(AuthActions.setPaymentsLoading(false));
  //console.log("response", response);
}
export function* getRechargeMobile(params) {
  const response = yield call(
    AuthRequest.fetchRechargeMobile,
    params.service_id,
    params.tel_no
  );
  if (response) {
    if (response?.data) {
      if (response?.data.wallet) {
        const accountData = localStorage.getItem("accountDataB");
        const data = JSON.parse(accountData);

        const d = {
          ...data,
          profile: {
            ...data.profile,
            wallet: response?.data.wallet,
          },
        };

        localStorage.setItem("accountDataB", JSON.stringify(d));
        yield put(AuthActions.setAccountInfo(d));
      }
      yield put(
        AuthActions.setRechargeMobile({
          ...response?.data,
          msg: response?.data?.message,
        })
      );
    } else if (response?.error) {
      yield put(AuthActions.setRechargeMobile(response?.error.response?.data));
    }
    //set loading false
    if (params.callBack) {
      params.callBack(false);
    }
  }
}

export function* getPostePay(params) {
  const response = yield call(
    AuthRequest.fetchPostePay,
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
    if (response?.data) {
      if (response?.data.wallet) {
        const accountData = localStorage.getItem("accountDataB");
        const data = JSON.parse(accountData);

        const d = {
          ...data,
          profile: {
            ...data.profile,
            wallet: response?.data.wallet,
          },
        };

        localStorage.setItem("accountDataB", JSON.stringify(d));
        yield put(AuthActions.setAccountInfo(d));
      }
      yield put(AuthActions.setPostePay(response?.data));
      params.clearFields();
    } else if (response?.error) {
      yield put(AuthActions.setPostePay(response?.error.response?.data));
    }
    if (params.setPostePayLoading) params.setPostePayLoading(false);
  }
}

export function* getAds() {
  const response = yield call(AuthRequest.fetchAds);
  if (response?.status === 200) {
    yield put(AuthActions.setAds(response?.data.messages));
    yield put(
      AuthActions.setPrivateMsg(
        response?.data.ticket_messages
          ? [
              ...response?.data.private_messages,
              ...response?.data.ticket_messages,
            ]
          : response?.data.private_messages
      )
    );
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
    AuthRequest.fetchRegisterAllInfo,
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
    params.percentage,
    params.register_token
  );

  if (response?.data) {
    yield put(AuthActions.setRegister(response?.data));
    yield delay(6000);
    yield put(AuthActions.setRegister({}));
  } else if (response?.error) {
    yield put(AuthActions.setRegister(response?.error.response?.data));
  }
}

export function* createAds({ data }) {
  let { importance, title, text } = data;
  yield put(AuthActions.createAdsResponse(true, null));
  const response = yield call(
    AuthRequest.sendCreatedAds,
    importance,
    title,
    text
  );
  if (response) {
    if (response?.status === 200) {
      yield put(AuthActions.createAdsResponse(false, response?.data));
      yield delay(3000);
      yield put(AuthActions.createAdsResponse(false, null));
    } else {
      yield put(
        AuthActions.createAdsResponse(false, response?.error.response?.data)
      );
      yield delay(3000);
      yield put(AuthActions.createAdsResponse(false, null));
    }
  }
}
export function* getChangedPassword(data) {
  const response = yield call(
    AuthRequest.sendChangedPassword,
    data.oldPassword,
    data.newPassword
  );
  if (response?.message) {
    notification["success"]({
      message: response?.data?.message,
    });
  }
  // console.log("ca ka responseeeee", response, response?.message);
}
export function* getConfigura(data) {
  const response = yield call(AuthRequest.fetchConfigura, data.id);
  if (response?.status === 200) {
    yield put(AuthActions.setConfiguraData(response?.data.user));
  } else {
    yield put(AuthActions.setConfiguraData({}));
  }
}
export function* getCodiceTicket({ barcode, service }) {
  const response = yield call(AuthRequest.fetchCodice, barcode, service);
  if (response?.status === 200) {
    yield put(
      AuthActions.setPaymentsFromCode({ ...response?.data.payment, barcode })
    );
  }
  if (response?.error) {
    yield put(AuthActions.setPaymentsFromCode(response?.error.response?.data));
  }
}
export function* getBarcodeData(e) {
  const response = yield call(AuthRequest.fetchBarcodeData, e.barcode);
  if (response?.status === 200) {
    yield put(AuthActions.setBarcodeData(response?.data));
    e.callback(response?.data);
  } else {
    yield put(AuthActions.setBarcodeData(response?.message));
    e.callback(response?.data);
  }
}
export function* changeAgent(data) {
  let response;
  if (data?.skin_id && data?.skin_id !== -1) {
    response = yield call(
      AuthRequest.changeAgentReq,
      data.id,
      data.id2,
      data.skin_id
    );
  } else {
    response = yield call(AuthRequest.changeAgentReq, data.id, data.id2);
  }
  if (response) {
    if (response?.status === 200) {
      yield put(AuthActions.setUserDetail({}));
      // const ress = yield call(fetchUsers);
      // if (ress.data) {
      //   yield put(MainActions.setUsers(ress.data.users));
      // }
    }
  }
  // console.log("response changeAgent", data, response);
}
export function* changeAgentSkin({ agent_id, new_skin_id }) {
  notification["info"]({
    key: "changeAgentSkin",
    duration: 0,
    message: "Attendere, il cambiamento in corso",
  });
  const response = yield call(
    AuthRequest.changeAgentSkinReq,
    agent_id,
    new_skin_id
  );
  if (response) {
    if (response?.status === 200) {
      notification["success"]({
        message: response.data.message,
      });
      notification.close("changeAgentSkin");
      yield put(AuthActions.setUserDetail({}));
      yield put(MainActions.setActiveSkinId(new_skin_id));
    }
  }
}
export function* getUserDetail(data) {
  const response = yield call(
    AuthRequest.fetchUserDetails,
    data.id,
    data.skin_id
  );
  if (response) {
    if (response?.status === 200) {
      yield put(
        AuthActions.setUserDetail({ ...response?.data.user, role: "agency" })
      );
    }
  }
  // console.log("response get users details", data, response);
}
export function* updateUserDetail(data) {
  let response;

  response = yield call(
    AuthRequest.updateUsers,
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
    data?.skin_id && data?.skin_id !== -1 ? data?.skin_id : null,
    data.mainAdminObj
  );

  if (response?.data) {
    if (response?.status === 200) {
      notification["success"]({
        message: "Azione completata",
        description: response?.data.message,
      });
      yield delay(4000);
      yield put(AuthActions.updateUserDetailMsg(""));
    }
    data.resetState(data.user_id);
  }
  if (response?.error) {
    yield delay(4000);
    yield put(AuthActions.updateUserDetailMsg(""));
  }
}
export function* getSkinExtras({ activeSkinId }) {
  const response = yield call(AuthRequest.fetchSkinExtras, activeSkinId);
  if (response?.data) {
    if (response?.status === 200) {
      yield put(AuthActions.setSkinExtras(response?.data.skin));
    }
  }
  // console.log("response skin extras", response);
}
export function* getErrors({ limit, page_number, DONT_LOAD }) {
  if (!DONT_LOAD) {
    yield put(AuthActions.setErrorsLoading(true));
  }

  const response = yield call(AuthRequest.fetchErrors, limit, page_number);
  if (response?.data) {
    if (response?.status === 200) {
      yield put(
        AuthActions.setErrors({
          errors: response?.data?.errors,
          total_pages: response?.data?.total_pages,
        })
      );
    }
  }
  yield put(AuthActions.setErrorsLoading(false));
  // console.log("fetchErrors", response);
}
export function* deleteError(data) {
  const response = yield call(AuthRequest.deleteErrorReq, data.id);
  if (response?.data) {
    if (response?.status === 200) {
      notification["success"]({
        message: `Error con id ${data.id} [DELETED]`,
        placement: "topRight",
      });
      if (data.c) {
        data.c();
      }
    }
  }
  // console.log("deleteErrorReq", response);
}

export function* sendDataForm(data) {
  const response = yield call(
    AuthRequest.sendDataFormReq,
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
    data.prezzo
  );
  if (response?.status === 200) {
    data.callBack({
      error: false,
      msg: response?.data.message,
    });
  }

  // console.log("ca ka response", data, response);
}
export function* getDataFormDetails({ limit, page_number }) {
  const response = yield call(
    AuthRequest.getDataFormDetailReq,
    limit,
    page_number
  );

  if (response?.data) {
    if (response?.status === 200) {
      yield put(AuthActions.setDataFormDetails(response?.data));
    }
  }
}
export function* getDataFormDetailsActives(data) {
  const response = yield call(
    AuthRequest.getDataFormDetailActivesReq,
    data.isVisure,
    data.limit,
    data.page_number
  );

  if (response?.data) {
    if (response?.status === 200) {
      yield put(AuthActions.setDataFormDetailsActives(response?.data));
    }
  }
}
export function* getTicketByTicketId(ticket_id) {
  const response = yield call(
    AuthRequest.getTicketByTicketIdReq,
    ticket_id.ticket_id
  );

  if (response?.data) {
    if (response?.status === 200) {
      yield put(AuthActions.setTicketByTicketId(response?.data.data));
    }
  }
  // console.log("fetchErrors", response);
}

export function* updateDataForm(data) {
  const response = yield call(
    AuthRequest.updateDataFormReq,
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
    data.ticket_id,
    data.consegna,
    data.cognome,
    data.phone,
    data.stato,
    data.citta,
    data.address1,
    data.address2,
    data.provincia,
    data.cap,
    data.note_address,
    data.company_name,
    data.energiaObj
  );
  if (response?.status === 200) {
    data.callBack({
      error: false,
      msg: response?.data.message,
    });
  }
}
export function* sendVisureDetails(data) {
  const response = yield call(
    AuthRequest.sendVisureDetailsReq,
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
}
export function* getVisure() {
  const response = yield call(AuthRequest.getVisureReq);

  if (response?.data) {
    if (response?.status === 200) {
      yield put(AuthActions.setVisure(response?.data));
    }
  }
}
export function* getVisureByVisureId(visura_id) {
  const response = yield call(AuthRequest.getVisureByVisureIdReq, visura_id);

  if (response?.data) {
    if (response?.status === 200) {
      yield put(AuthActions.setVisureByVisureId(response?.data.data));
    }
  }
}

export function* updateVisura(data) {
  const response = yield call(
    AuthRequest.updateVisuraReq,
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
}
export function* getAgentByUserId(data) {
  const response = yield call(
    AuthRequest.getAgentByUserIdReq,
    data.user_id,
    data.skin_id
  );

  if (response?.data) {
    if (response?.status === 200) {
      yield put(
        AuthActions.setUserDetail({ ...response?.data.user, role: "agent" })
      );
    }
  }
}
export function* getUserByUserId(data) {
  const response = yield call(
    AuthRequest.getUserByUserIdReq,
    data.user_id,
    data.skin_id
  );

  if (response?.data) {
    if (response?.status === 200) {
      yield put(
        AuthActions.setUserDetail({ ...response?.data.user, role: "user" })
      );
    }
  }
}
export function* getSkins() {
  const response = yield call(AuthRequest.getSkinsReq);

  if (response?.data) {
    if (response?.status === 200) {
      yield put(AuthActions.setSkins(response?.data.users));
    }
  }
}
export function* getFaturaDetails(params) {
  const response = yield call(
    AuthRequest.getFaturaDetailsReq,
    params.user_id,
    params.year,
    params.month
  );
  if (response?.data) {
    if (response?.status === 200) {
      yield put(AuthActions.setFaturaDetails(response?.data));
    }
  }
}
export function* getAllServices({ skin_id }) {
  yield put(AuthActions.setServicesLoading(true));
  const response = yield call(AuthRequest.getAllServicesReq, skin_id);
  if (response?.data) {
    if (response?.status === 200) {
      yield put(AuthActions.setAllServices(response?.data.result));
    }
  }

  yield put(AuthActions.setServicesLoading(false));
}
export function* getAllFaturaBySearch({
  username,
  year,
  month,
  perPage,
  page_number,
}) {
  yield put(AuthActions.setFatturaLoading(true));
  const response = yield call(
    AuthRequest.getAllFaturaBySearchReq,
    username,
    year,
    month,
    perPage,
    page_number
  );
  if (response?.data) {
    if (response?.status === 200) {
      yield put(
        AuthActions.setAllFaturaBySearch({
          FaturaDetails: response?.data?.fatture,
          Users: response?.data?.usernames && response?.data?.usernames,
          total_pages: response?.data?.total_pages,
          total_records: response?.data?.total_records,
        })
      );
    }
    yield put(AuthActions.setFatturaLoading(false));
  }
}
export function* sendMailFattura({ file_name }) {
  const response = yield call(AuthRequest.sendMailFatturaReq, file_name);
  if (response) {
    notification["success"]({
      message: "Azione completata",
      description: response?.data.message,
      placement: "bottomRight",
    });
  }
}
export function* AddSkinNew({ name, url, email, agency_rent }) {
  const response = yield call(
    AuthRequest.AddSkinReq,
    name,
    url,
    email,
    agency_rent
  );
  if (response?.data) {
    // console.log(response?.data.skin_id);
    yield put(AuthActions.setSkinId(response?.data.skin_id));
    yield put(AuthActions.registerSkinSucc({ addSkinSucc: true }));
  }
}
export function* getWidgetPayments({ skin_id }) {
  const response = yield call(AuthRequest.widgetPaymentsReq, skin_id);
  if (response?.data) {
    yield put(AuthActions.setWidgetPayments(response?.data.payments));
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
    AuthRequest.AddSuperAdminReq,
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
    notification["success"]({
      message: "Azione completata",
      description: response?.data.message,
    });
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
  area_download,
}) {
  const response = yield call(
    AuthRequest.AddExtraDataReq,
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
    area_download
  );
  if (response) {
    yield put(AuthActions.registerSkinSucc({ addExtraDataSucc: true }));
  }
}
export function* getStatistiche(params) {
  const response = yield call(AuthRequest.getStatisticheReq, params.skin_id);
  if (response) {
    yield put(AuthActions.setStatistiche(response?.data));
  }
}
export function* UpdateServiceChangeStatus(params) {
  const response = yield call(
    AuthRequest.ServiceChangeStatusReq,
    params.name,
    params.full_name,
    params.company_id,
    params.active,
    params.skin_id
  );
  if (response) {
    yield call(params.c);
  }
}
export function* getCustomVoucherReq(params) {
  const response = yield call(
    AuthRequest.customVoucher,
    params.service_id,
    params.tel_no
  );
  if (response) {
    if (response?.data) {
      if (response?.data.wallet) {
        const accountData = localStorage.getItem("accountDataB");
        const data = JSON.parse(accountData);

        const d = {
          ...data,
          profile: {
            ...data.profile,
            wallet: response?.data.wallet,
          },
        };

        localStorage.setItem("accountDataB", JSON.stringify(d));
        yield put(AuthActions.setAccountInfo(d));
      }
      yield put(
        AuthActions.setRechargeMobile({
          ...response?.data,
          msg: response?.data?.message,
        })
      );
    } else if (response?.error) {
      yield put(AuthActions.setRechargeMobile(response?.error?.response?.data));
    }
    if (params.callBack) {
      params.callBack(false);
    }
  }
}
export function* getStatisticheMain() {
  const response = yield call(AuthRequest.StatisticheMainReq);
  if (response?.data) {
    yield put(
      AuthActions.setStatisticheMain({
        data: response?.data.data,
        rete: response?.data.rete,
        total: response?.data.total,
      })
    );
  }
}
export function* fetchBolletini({
  service_id,
  person_type,
  via_piazza,
  cap,
  citta,
  provincia,
  importo,
  tipologia,
  numero_conto_corrente,
  causale,
  nome,
  cognome,
  codice_fiscale,
  denominazione,
  partita_iva,
  email,
  phone_number,
  codice_identificativo,
  clearFields,
}) {
  notification["info"]({
    key: "PaymentLoading",
    duration: 0,
    message: "Attendere, transazione in corso",
  });
  const response = yield call(
    AuthRequest.fetchBolletiniRequest,
    service_id,
    person_type,
    via_piazza,
    cap,
    citta,
    provincia,
    importo,
    tipologia,
    numero_conto_corrente,
    causale,
    nome,
    cognome,
    codice_fiscale,
    denominazione,
    partita_iva,
    email,
    phone_number,
    codice_identificativo
  );
  if (response) {
    if (response?.data) {
      notification.close("PaymentLoading");
      yield put(AuthActions.setBolletiniBianchi(response?.data));
      clearFields();
      notification["success"]({
        message: response?.data.message,
      });
      if (response?.data.wallet) {
        const accountData = localStorage.getItem("accountDataB");
        const data = JSON.parse(accountData);

        const d = {
          ...data,
          profile: {
            ...data.profile,
            wallet: response?.data.wallet,
          },
        };

        localStorage.setItem("accountDataB", JSON.stringify(d));
        yield put(AuthActions.setAccountInfo(d));
      }
    } else if (response?.error) {
      notification.close("PaymentLoading");
    }
  }
  notification.close("PaymentLoading");
}
export function* buyTicketOnline({
  typee,
  link,
  nome_agenzia,
  extra_data,
  price,
  consegna,
  nome,
  cognome,
  email,
  phone,
  stato,
  citta,
  address1,
  address2,
  provincia,
  cap,
  note_address,
  company_name,
  callBack,
}) {
  const response = yield call(
    AuthRequest.buyTicketOnlineReq,
    typee,
    link,
    nome_agenzia,
    extra_data,
    price,
    consegna,
    nome,
    cognome,
    email,
    phone,
    stato,
    citta,
    address1,
    address2,
    provincia,
    cap,
    note_address,
    company_name
  );
  if (response?.status === 200) {
    callBack({
      error: false,
      msg: response?.data.message,
    });
  }
}
export function* setPagoPa({
  service_id,
  person_type,
  via_piazza,
  citta,
  email,
  phone_number,
  tipologia,
  codice_fiscale_bol,
  codice_aviso,
  nome,
  cognome,
  codice_fiscale,
  denominazione,
  partita_iva,
  clearFields,
  tipo_veicolo,
  targa,
}) {
  notification["info"]({
    key: "pagoPaPayment",
    duration: 0,
    message: "Attendere, transazione in corso",
  });

  const response = yield call(
    AuthRequest.pagoPaRequest,
    service_id,
    person_type,
    via_piazza,
    citta,
    email,
    phone_number,
    tipologia,
    codice_fiscale_bol,
    codice_aviso,
    nome,
    cognome,
    codice_fiscale,
    denominazione,
    partita_iva,
    tipo_veicolo,
    targa
  );
  if (response) {
    if (response?.data) {
      notification.close("pagoPaPayment");
      yield put(AuthActions.setBolletiniBianchi(response?.data.data));
      clearFields();
      notification["success"]({
        message: response?.data.message,
      });
    } else if (response?.error) {
      notification.close("pagoPaPayment");
    }
  }
  notification.close("pagoPaPayment");
}
export function* setFreccia({
  service_id,
  importo,
  causale,
  person_type,
  via_piazza,
  cap,

  citta,
  provincia,
  email,
  phone_number,
  identificativo_pagamento,
  iban,
  cin_importo,

  cin_intermedio,
  cin_complessivo,
  codice_esenzione,
  nome,
  cognome,
  codice_fiscale,
  denominazione,
  partita_iva,
  callBack,
}) {
  notification["info"]({
    key: "frecciaPayment",
    duration: 0,
    message: "Attendere, transazione in corso",
  });

  const response = yield call(
    AuthRequest.frecciaRequest,
    service_id,
    importo,
    causale,
    person_type,
    via_piazza,
    cap,

    citta,
    provincia,
    email,
    phone_number,
    identificativo_pagamento,
    iban,
    cin_importo,

    cin_intermedio,
    cin_complessivo,
    codice_esenzione,
    nome,
    cognome,
    codice_fiscale,
    denominazione,
    partita_iva
  );
  if (response) {
    if (response?.data) {
      notification.close("frecciaPayment");
      yield put(AuthActions.setBolletiniBianchi(response?.data.data));
      callBack();
      notification["success"]({
        message: response?.data.message,
      });
    } else if (response?.error) {
      notification.close("frecciaPayment");
    }
  }
  notification.close("frecciaPayment");
}
export function* setMavRav({
  service_id,
  person_type,
  via_piazza,
  citta,
  email,
  phone_number,
  importo,
  codice,
  nome,
  cognome,
  codice_fiscale,
  denominazione,
  partita_iva,
  clearFields,
}) {
  notification["info"]({
    key: "mavRavPayment",
    message: "Attendere, transazione in corso",
    duration: 0,
  });
  const response = yield call(
    AuthRequest.mavRavRequest,
    service_id,
    person_type,
    via_piazza,
    citta,
    email,
    phone_number,
    importo,
    codice,
    nome,
    cognome,
    codice_fiscale,
    denominazione,
    partita_iva
  );
  if (response?.status === 200) {
    if (response?.data) {
      notification.close("mavRavPayment");
      yield put(AuthActions.setBolletiniBianchi(response?.data));
      clearFields();
      notification["success"]({
        message: response?.data.message,
      });
    } else if (response?.error) {
      notification.close("mavRavPayment");
    }
  }
  notification.close("mavRavPayment");
}

export function* payPagoPa({
  service_id,
  total_amount,
  fee_amount,
  pagamento_id,
}) {
  notification["info"]({
    key: "payPagoPA",
    message: "Attendere, transazione in corso",
    duration: 0,
  });
  const response = yield call(
    AuthRequest.payPagoPaReq,
    service_id,
    total_amount,
    fee_amount,
    pagamento_id
  );
  if (response?.status === 200) {
    if (response?.data) {
      notification.close("payPagoPA");
      yield put(AuthActions.setBolletiniBianchi(response?.data));
      notification["success"]({
        message: response?.data.message,
      });
    } else if (response?.error) {
      notification.close("payPagoPA");
    }
  }
  notification.close("payPagoPA");
}
export function* setBokingSep({
  service_id,
  person_type,
  via_piazza,
  citta,
  provincia,
  gender,
  vat,
  codice_ufficio,
  codice_atto,
  data_pagamento,
  importo,
  taxes_array,
  nome,
  cognome,
  codice_fiscale,
  denominazione,
  partita_iva,
  email,
  phone_number,
  codice_fiscale_optional,
  clearFields,
}) {
  notification["info"]({
    key: "bokkingF24",
    message: "Attendere, transazione in corso",
    duration: 0,
  });
  const response = yield call(
    AuthRequest.bokkingF24Req,
    service_id,
    person_type,
    via_piazza,
    citta,
    provincia,
    gender,
    vat,
    codice_ufficio,
    codice_atto,
    data_pagamento,
    importo,
    taxes_array,
    nome,
    cognome,
    codice_fiscale,
    denominazione,
    partita_iva,
    email,
    phone_number,
    codice_fiscale_optional
  );
  if (response?.status === 200) {
    if (response?.data) {
      notification.close("bokkingF24");
      yield put(AuthActions.setBolletiniBianchi(response?.data));
      if (clearFields) {
        clearFields();
      }
      notification["success"]({
        message: response?.data?.message,
      });
    } else if (response?.error) {
      notification.close("bokkingF24");
    }
  }
  notification.close("bokkingF24");
}
export function* setPayFSaga({ service_id, importo, fee, pagamento_id }) {
  notification["info"]({
    key: "payF24",
    message: "Attendere, transazione in corso",
    duration: 0,
  });
  const response = yield call(
    AuthRequest.payFReq,
    service_id,
    importo,
    fee,
    pagamento_id
  );
  if (response?.status === 200) {
    if (response?.data) {
      notification.close("payF24");
      yield put(AuthActions.setBolletiniBianchi(response?.data));
      notification["success"]({
        message: response?.data.message,
      });
    } else if (response?.error) {
      notification.close("payF24");
    }
  }
  notification.close("payF24");
}
export function* getRegistrazioneData() {
  const response = yield call(AuthRequest.getRegistrazioneDataReq);
  if (response?.data) {
    yield put(AuthActions.setRegistrazioneData(response?.data?.data));
  }
}
export function* createUserBgame({
  nome,
  cognome,
  data_nascita,
  sesso,
  id_nazione_nascita,
  id_comune_nascita,
  codice_fiscale,
  id_comune_residenza,
  indirizzo,
  cap,
  telefono,
  cellulare,
  email,
  id_tipo_documento,
  documento,
  rilasciato_da,
  data_rilascio,
  data_scadenza,
  id_nazione_cittadinanza,
  nick,
  password,
  question,
  answer,
}) {
  const response = yield call(
    AuthRequest.createUserBgameReq,
    nome,
    cognome,
    data_nascita,
    sesso,
    id_nazione_nascita,
    id_comune_nascita,
    codice_fiscale,
    id_comune_residenza,
    indirizzo,
    cap,
    telefono,
    cellulare,
    email,
    id_tipo_documento,
    documento,
    rilasciato_da,
    data_rilascio,
    data_scadenza,
    id_nazione_cittadinanza,
    nick,
    password,
    question,
    answer
  );
  if (response?.message) {
    notification["success"]({
      message: response?.data?.message,
    });
  }
}
