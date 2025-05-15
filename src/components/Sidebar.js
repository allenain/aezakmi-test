import Logo from "../components/Logo.js";
import currenciesIcon from "!!raw-loader!../assets/icons/currencies.svg";
import videoIcon from "!!raw-loader!../assets/icons/video.svg";
import timerIcon from "!!raw-loader!../assets/icons/hourglass.svg";
import exitIcon from "!!raw-loader!../assets/icons/exit.svg";

const NAV_ITEMS = [
  { href: "/currency", icon: currenciesIcon, label: "Exchange rates" },
  { href: "/video", icon: videoIcon, label: "Video player" },
  { href: "/timer", icon: timerIcon, label: "Countdown timer" },
];

const Sidebar = (pageContent = "") => {
  const current = window.location.pathname;

  const navHtml = NAV_ITEMS.map(
    ({ href, icon, label }) => `
        <a href="${href}" class="nav-item ${current === href ? "active" : ""}">
          <span class="input-icon nav-icon ${current === href ? "active" : ""}">${icon}</span>
          <span class="nav-text body">${label}</span>
        </a>`,
  ).join("");

  return `
    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar-top">
        <div class="sidebar-top-logo">${Logo}</div>
          <nav class="nav">
            ${navHtml}
          </nav>
        </div>

        <div class="sidebar-bottom">
          <a href="/auth" class="nav-item logout">
            <span class="input-icon">${exitIcon}</span>
            <span class="nav-text callout">Log out</span>
          </a>
        </div>
      </aside>

      <main class="main">
        ${pageContent}
      </main>
    </div>
  `;
};

export function updateActiveNav(path) {
  document.querySelectorAll(".nav-item").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === path);
  });
}

export default Sidebar;
