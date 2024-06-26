import axios from "axios";
import { env } from "../../../../env";

export const LOGIN_URL = `${env.REACT_APP_API_URL}/api/login`;
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = `${env.REACT_APP_API_URL}/api/user/me`;

export function login(username, password) {
  return axios.post(LOGIN_URL, { username, password }).catch((error) => {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
  });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
