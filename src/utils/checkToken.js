import { goTo } from "./goTo";
import { BASE_PATH } from "../common/constants.js";

export function checkTokenOrRedirect() {
  const token = localStorage.getItem("accessToken");
  const expires = localStorage.getItem("tokenExpires");
  const isValid = token && Date.now() < Number(expires);

  const currentPath = window.location.pathname;

  const isOnAuth = currentPath.startsWith(`${BASE_PATH}/auth`);
  const isOnPublic = currentPath === `${BASE_PATH}/` || isOnAuth;

  if (!isValid && !isOnAuth) {
    goTo(`${BASE_PATH}/auth`);
    return false;
  }

  if (isValid && isOnAuth) {
    goTo(`${BASE_PATH}/currency`);
    return false;
  }

  return true;
}
