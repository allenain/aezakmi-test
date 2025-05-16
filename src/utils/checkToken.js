const BASE_PATH = "/aezakmi-test";

export function checkTokenOrRedirect() {
  const token = localStorage.getItem("accessToken");
  const expires = localStorage.getItem("tokenExpires");
  const isValid = token && Date.now() < Number(expires);
  const isAuthPage = window.location.pathname === "/auth";

  if (!isValid && !window.location.pathname.startsWith(`${BASE_PATH}/auth`)) {
    window.location.href = `${BASE_PATH}/auth`;
  }
  if (isValid && window.location.pathname === `${BASE_PATH}/auth`) {
    window.location.href = `${BASE_PATH}/currency`;
  }
}
