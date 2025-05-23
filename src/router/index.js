import appConstants from "../common/constants.js";
import { checkTokenOrRedirect } from "../utils/checkToken.js";
import Sidebar, { updateActiveNav } from "../components/Sidebar.js";
import initAuthPage from "../scripts/auth.js";
import AuthPage from "../pages/auth.template.js";
import CurrencyPage from "../pages/currency.template.js";
import VideoPage from "../pages/video.template.js";
import TimerPage from "../pages/timer.template.js";
import initCurrencyPage from "../scripts/coursesCurrency";
import initConverter from "../scripts/converterCurrency";
import initVideoPage from "../scripts/video";
import initTimer from "../scripts/timer";
import { goTo } from "../utils/goTo";

const routes = {
  [appConstants.routes.auth]: AuthPage,
  [appConstants.routes.currency]: CurrencyPage,
  [appConstants.routes.video]: VideoPage,
  [appConstants.routes.timer]: TimerPage,
  [appConstants.routes.index]: AuthPage,
};

let layoutInitialized = false;

function mountLayout(initialContent) {
  document.querySelector("#app").innerHTML = Sidebar(initialContent);
  layoutInitialized = true;
}

export function render(path) {
  const proceed = checkTokenOrRedirect();
  if (!proceed) return;
  const pageHtml = routes[path] ?? "<h1>404 – Not found</h1>";

  const isPublic =
    path === appConstants.routes.index || path === appConstants.routes.auth;

  if (isPublic) {
    document.querySelector("#app").innerHTML = pageHtml;
    initAuthPage();
    layoutInitialized = false;
    return;
  }

  if (!layoutInitialized) {
    mountLayout(pageHtml);
  } else {
    document.querySelector(".main").innerHTML = pageHtml;
  }
  const logoutLink = document.querySelector(".logout");

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }
  updateActiveNav(path);
  if (path === appConstants.routes.currency) {
    initCurrencyPage();
    initConverter();
  }
  if (path === appConstants.routes.video) {
    initVideoPage();
  }
  if (path === appConstants.routes.timer) {
    initTimer();
  }
}

function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("tokenExpires");
}

export default function initRouter() {
  window.addEventListener("popstate", () => render(window.location.pathname));

  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="/"]');
    if (!link) return;
    e.preventDefault();
    goTo(new URL(link.href).pathname);
  });

  render(window.location.pathname);
}
