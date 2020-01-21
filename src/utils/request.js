import axios from "axios";

import api from "../config/api";

export default axios.create({
  baseURL: api.baseUrl,
  headers: api.headers
});
