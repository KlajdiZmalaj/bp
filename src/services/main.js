import { skin, endpoint } from "config/api";
import axios from "axios";
import { notification } from "antd";

export const instanceAxios = axios.create({
  baseURL: endpoint,
});
const hasCode = (error, status) => {
  if (
    error?.response?.status === parseInt(status) ||
    error.error?.response?.status === parseInt(status) ||
    error?.response?.status === parseInt(status)
  ) {
    return true;
  } else {
    return false;
  }
};
const handleError = (error) => {
  console.log(
    "error handler mainJS",
    error,
    error.response.status,
    error.error?.response?.status
  );
  if (hasCode(error, 401)) {
    //logout
  } else if (hasCode(error, 445)) {
    //skin id wrong
  } else if (hasCode(error, 440)) {
    localStorage.setItem("accountDataB", null);
  } else if (hasCode(error, 429)) {
    console.log("to many request");
  } else if (hasCode(error, 403)) {
    //forbiden , kryesisht > prenotazione
    notification["warning"]({
      message: `Azione completata una volta`,
    });
  } else {
    notification["error"]({
      message: error?.response?.data?.message,
      description:
        error?.response?.data?.errors &&
        Object.values(error.response.data.errors),
      placement: "bottomRight",
      duration: 4,
    });
  }

  return Promise.reject(error);
};
instanceAxios.interceptors.request.use(
  async (config) => {
    console.log("req config", config);
    var Auth = true;
    if (
      config.url.includes("/users/login") ||
      config.url.includes("/skin/extra") ||
      //barkkodi qe hapet me qr pa token param omelale
      config.url === "/payment"
    ) {
      //api -> without token
      Auth = false;
    }
    const value = await localStorage.getItem("accountDataB");
    const keys = JSON.parse(value);
    config.headers = {
      ...(Auth ? { Authorization: `Bearer ${keys.token}` } : {}),
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
instanceAxios.interceptors.response.use(
  (response) => {
    // console.log("response", response);
    return response;
  },
  (error) => handleError(error)
);
export const createPrenotazione = ({
  type,
  // ========== luce / gas -> start ==========
  tipologia_persona,
  tipologia_contratto,
  nome_cognome_consulento,
  codice_consulento,
  telefono,
  email,
  conferma_email,
  //tipologia_persona === 1
  nome,
  cognome,
  luogo_nascita,
  data_nascita,
  codice_fiscale,
  //tipologia_persona else
  ragione_sociale,
  p_iva,
  nome_cognome_rappresentante,
  codice_rappresentante,
  //
  residenza_comune,
  residenza_indirizzo,
  residenza_civico,
  residenza_cap,
  corrispondenza,
  //corrispondenza  === 2
  corrispondenza_comune,
  corrispondenza_indirizzo,
  corrispondenza_civico,
  corrispondenza_cap,
  //
  fornitura,
  //fornitura ===2
  fornitura_comune,
  fornitura_indirizzo,
  fornitura_civico,
  fornitura_cap,
  //
  confermo_fornitura,
  confermo_econimoche,
  confermo_informativa,
  confermo_presa_visione,
  marketing,
  dati_personali,
}) => {
  return instanceAxios
    .post(`/prenotazione/create`, {
      ...skin,
      type,
      // ========== luce / gas -> start ==========
      tipologia_persona,
      tipologia_contratto,
      nome_cognome_consulento,
      codice_consulento,
      telefono,
      email,
      conferma_email,
      //tipologia_persona === 1
      nome,
      cognome,
      luogo_nascita,
      data_nascita,
      codice_fiscale,
      //tipologia_persona else
      ragione_sociale,
      p_iva,
      nome_cognome_rappresentante,
      codice_rappresentante,
      //
      residenza_comune,
      residenza_indirizzo,
      residenza_civico,
      residenza_cap,
      corrispondenza,
      //corrispondenza  === 2
      corrispondenza_comune,
      corrispondenza_indirizzo,
      corrispondenza_civico,
      corrispondenza_cap,
      //
      fornitura,
      //fornitura ===2
      fornitura_comune,
      fornitura_indirizzo,
      fornitura_civico,
      fornitura_cap,
      //
      confermo_fornitura,
      confermo_econimoche,
      confermo_informativa,
      confermo_presa_visione,
      marketing,
      dati_personali,
    })
    .catch((error) => ({ error }));
};
export const fetchServices = () =>
  instanceAxios
    .get(`/services`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
export const fetchFavorites = () =>
  instanceAxios
    .post(`/users/favorites`, {
      ...skin,
    })
    .catch((error) => ({ error }));

export const fetchUsers = (
  search_user,
  skin_id,
  backoffice,
  limit,
  page_number
) => {
  const skin_id_to_use = skin_id ? skin_id : { ...skin };
  return instanceAxios
    .post(`/users/list`, {
      ...(search_user ? { search_user } : {}),
      ...(limit ? { limit } : {}),
      ...(page_number ? { page_number } : {}),
      ...skin_id_to_use,
      ...(backoffice ? backoffice : {}),
    })
    .catch((error) => ({ error }));
};
export const fetchUsersSimple = () =>
  instanceAxios
    .get(`/simpleUsers`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));

export const fetchUsersBySearch = (search_user) =>
  instanceAxios
    .post(`/users/findUser`, {
      ...(search_user ? { search_user: search_user } : {}),
      ...skin,
    })
    // .then(data => {
    //   console.log("fetch users called", data,);
    // })
    .catch((error) => ({ error }));

export const fetchSearchedUsers = (search_user) =>
  instanceAxios
    .post(`/users/search`, {
      search_user,
      ...skin,
    })
    // .then(data => {
    //   console.log("fetch users called", data,);
    // })
    .catch((error) => ({ error }));

export const postImages = (user_id, imgFront, imgBack, callback) => {
  instanceAxios
    .post(`/users/updateDocument`, {
      ...{ user_id: user_id },
      ...{ document_front: imgFront },
      ...{ document_back: imgBack },
      ...skin,
    })
    .then((response) => {
      // console.log("response", response);
      if (response.status === 200) {
        callback();
      }
    })
    .catch((error) => ({ error }));
};

export const deleteImages = (user_id, callback) => {
  instanceAxios
    .post(`/users/deleteDocument`, {
      ...{ user_id: user_id },
      ...skin,
    })
    .then((response) => {
      // console.log("response", response);
      if (response && response && response.status === 200) {
        callback();
      }
    });
};

export const updatateOverviewWidget = (period) =>
  instanceAxios
    .post(`/users/balance`, {
      ...{ period: period },
      ...skin,
    })
    .catch((error) => ({ error }));

export const setOnFav = (id, type) =>
  instanceAxios
    .post(`/users/${type === "set" ? "addFavorite" : "removeFavorite"}`, {
      ...{ company_id: id },
      ...skin,
    })
    .catch((error) => ({ error }));

export const fetchphotos = (id) => {
  return instanceAxios.get(`user/${id}/photos`, {
    params: {
      ...skin,
    },
  });
};

export const downloadFile = (document_name) => {
  return instanceAxios
    .get(`ticketDocument`, {
      params: {
        ...skin,
        document_name,
      },
    })
    .then((data) => {
      // console.log("ca ka download", data);
      const docBack = data?.data?.files?.document_back;
      const docFront = data?.data?.files?.document_front;
      if (docBack) {
        const downloadLink = document.createElement("a");
        const fileName = "Document.pdf";

        downloadLink.href = docBack;
        downloadLink.download = fileName;
        downloadLink.click();
      }
      if (docFront) {
        const downloadLink = document.createElement("a");
        const fileName = "Document.pdf";

        downloadLink.href = docFront;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    });
};
