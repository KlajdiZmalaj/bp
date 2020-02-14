import axios from "axios";
export const fetchServices = () =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`
      }
    })
    .get(`/services`)
    .catch(error => ({ error }));

export const fetchUsers = () =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`
      }
    })
    .post(`/users/list`)
    // .then(data => {
    //   console.log("fetch users called", data,);
    // })
    .catch(error => ({ error }));

export const postImages = (user_id, imgFront, imgBack, type) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`
      }
    })
    .post(`/users/updateDocument`, {
      ...{ user_id: user_id },
      ...(type === 1 ||
        type === 2 ||
        (type === 3 && { document_front: imgFront })),
      ...(type === 1 || (type === 2 && { document_back: imgBack }))
    })
    .catch(error => ({ error }));
