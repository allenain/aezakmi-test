export function checkTokenOrRedirect() {
  const token = localStorage.getItem("accessToken");
  const expires = localStorage.getItem("tokenExpires");
  const isValid = token && Date.now() < Number(expires);
  const isAuthPage = window.location.pathname === "/auth";

  if (!isValid && !isAuthPage) {
    window.location.href = "/auth";
  }
  if (isValid && isAuthPage) {
    window.location.href = "/currency";
  }
}
