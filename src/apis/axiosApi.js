// -----------------------------------------------------------------------------
// This file contains an instance of axios with a custom config (axiosClient)
// and an axiosFetch singleton to make http requests (axiosFetch)
// -----------------------------------------------------------------------------

import axios from "axios";
import { Router, useRouter } from "next/router";
import qs from "query-string";

/**
 * Create a new instance of axios with a custom config
 * use need to set(STORAGE.JWT)
 */
const axiosClient = axios.create({
  baseURL: "https://thuvien.nemosoftware.net/api/v1",
});

axiosClient.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");

    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    return config;
  },
  (error) => {
    if (error.data.data.response.status !== 401) return;
    Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const { status, data } = error.response;

    if (error.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      const res = await axios.post("https://thuvien.nemosoftware.net/api/v1/auth/refresh-token", {
        refreshToken: refreshToken.toString(),
      });

      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${res.data.meta.accessToken}`;
      localStorage.setItem("token", res.data.meta.accessToken);
      localStorage.setItem("refreshToken", res.data.meta.refreshToken);
      return;
    }
    if (error.status === 400 && error.status !== 401) {
      const error = data.message;
      throw new Error(error);
    }
    return Promise.reject(error);
  }
);

/**
 * Create a singleton for our base api
 */

class AxiosFetch {
  get(uri, params = {}) {
    const queryString = qs.stringify(params);
    const uriWithQuery = queryString ? `${uri}&${queryString}` : `${uri}`;
    return axiosClient.get(uriWithQuery);
  }
  post(uri, body) {
    return axiosClient.post(uri, body);
  }
  get2(uri, body) {
    return axiosClient.get(uri, body);
  }
  put(uri, body) {
    return axiosClient.put(uri, body);
  }
  patch(uri, body) {
    return axiosClient.patch(uri, body);
  }
  delete(uri, body) {
    return axiosClient.delete(uri, body);
  }
}
const appAxios = new AxiosFetch();
export default appAxios;
