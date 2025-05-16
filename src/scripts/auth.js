import setupPasswordToggles from "../utils/setupPasswordToggles.js";
import { goTo } from "../utils/goTo";
import appConstants from "../common/constants";

const VALID_CREDENTIALS = {
  login: "admin@example.com",
  password: "123456",
};

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
function showError(input, message) {
  const wrapper = input.closest(".input-wrapper");
  if (!wrapper) return;
  wrapper.classList.add("input-error");
  let error = wrapper.nextElementSibling;
  const isErrorLabel = error?.classList.contains("input-error-label");

  if (!isErrorLabel) {
    error = document.createElement("p");
    error.className = "input-error-label";
    wrapper.parentNode.insertBefore(error, wrapper.nextSibling);
  }

  error.textContent = message;
}

function clearError(input) {
  const wrapper = input.closest(".input-wrapper");
  if (!wrapper) return;

  wrapper.classList.remove("input-error");

  const error = wrapper.nextElementSibling;
  if (error?.classList.contains("input-error-label")) {
    error.remove();
  }
}

function generateToken() {
  return Math.random().toString(36).substring(2);
}

function saveToken(token, expiresInMs = 3600 * 1000) {
  const expires = Date.now() + expiresInMs;
  localStorage.setItem("accessToken", token);
  localStorage.setItem("tokenExpires", expires.toString());
}

const initAuthPage = () => {
  setupPasswordToggles();

  const form = document.querySelector(".auth-form");
  if (!form) return;

  const emailInput = form.querySelector("input[type='text']");
  const passwordInput = form.querySelector("input[type='password']");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    clearError(emailInput);
    clearError(passwordInput);

    let hasError = false;

    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Enter a valid email");
      hasError = true;
    }

    if (passwordInput.value.length < 6) {
      showError(passwordInput, "Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    const isValid =
      emailInput.value === VALID_CREDENTIALS.login &&
      passwordInput.value === VALID_CREDENTIALS.password;

    if (!isValid) {
      showError(emailInput, "Incorrect email or password");
      showError(passwordInput, "");
      return;
    }

    const token = generateToken();
    saveToken(token);

    goTo(appConstants.routes.currency);
  });
};

export default initAuthPage;
