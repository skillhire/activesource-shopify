import axios from "axios";
import { getCookie } from "cookies-next";
import { API_URL } from "constants/shop";

let headers = {
  "Content-Type": "application/json",
};

let authToken = getCookie("authToken");
if (authToken) {
  headers = {
    ...headers,
    Authorization: `Bearer ${authToken}`,
  };
}

const api = axios.create({
  baseURL: API_URL,
  headers: headers,
  timeout: 60000,
});

api.interceptors.response.use(
  (resp) => Promise.resolve(resp.data),
  (error) => Promise.reject(error.response)
);

export default api;
