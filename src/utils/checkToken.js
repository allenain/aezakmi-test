export function checkTokenOrRedirect() {
  const token = localStorage.getItem("accessToken");
  const expires = localStorage.getItem("tokenExpires");
  const isValid = token && Date.now() < Number(expires);

  if (!isValid && window.location.pathname !== "/auth") {
    window.location.href = "/auth";
  }
}
