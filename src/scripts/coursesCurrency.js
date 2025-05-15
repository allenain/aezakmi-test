import appConstants from "../common/constants.js";
import { getFlag } from "../utils/getFlag";
const { SELL_MARKUP, BUY_DISCOUNT } = appConstants.currency;

const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = process.env.CURRENCY_KEY;
const API_URL = `${BASE_URL}?apikey=${API_KEY}&base_currency=USD`;

const prevRates = {};
let prevTime = null;

export default function initCurrencyPage() {
  const rateBody = document.getElementById("rates-body");
  const salesBody = document.getElementById("sales-body");
  const courseBody = document.getElementById("course-body");
  if (!rateBody || !salesBody || !courseBody) return;

  let isMobile = window.innerWidth <= 1220;

  function debounce(fn, delay = 300) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  const debouncedResizeHandler = debounce(() => {
    isMobile = window.innerWidth <= 1220;
    handleResponsiveSelect();
    loadRates();
  }, 300);

  window.addEventListener("resize", debouncedResizeHandler);

  function addCurrencyRow(code) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td class="cur-cell">
      <div class="flag-container">${getFlag(code)}</div>
      <span class="title2 title2-bold">${code}</span>
    </td>`;
    rateBody.appendChild(tr);
  }

  function addSaleRow(code, rate) {
    const sell = (rate * (1 + SELL_MARKUP)).toFixed(4);
    const buy = (rate * (1 - BUY_DISCOUNT)).toFixed(4);

    const tr = document.createElement("tr");
    tr.innerHTML = isMobile
      ? `
      <td class="cur-cell">
        <div class="flag-container">${getFlag(code)}</div>
        <span class="body body-semibold">${code}</span>
      </td>
      <td class="body body-semibold">${sell}</td>
      <td class="body body-semibold">${buy}</td>`
      : `<td class="title2 title2-bold">${sell}</td><td class="title2 title2-bold">${buy}</td>`;

    salesBody.appendChild(tr);
  }

  function addCourseRow(code, rate, diff, timeStr) {
    const first = diff === null;
    const diffTxt = first ? "+0.0000" : (diff > 0 ? "+" : "") + diff.toFixed(4);
    const diffCls = first ? "pos" : diff > 0 ? "pos" : diff < 0 ? "neg" : "";

    const tr = document.createElement("tr");
    tr.innerHTML = isMobile
      ? `
      <td class="cur-cell">
        <div class="flag-container">${getFlag(code)}</div>
        <span class="body body-semibold">${code}</span>
      </td>
      <td class="body body-semibold">${rate.toFixed(4)}</td>
      <td class="body td-difference ${diffCls}">${diffTxt}</td>
      <td class="body td-time">${timeStr}</td>`
      : `
      <td class="title2 title2-bold">${rate.toFixed(4)}</td>
      <td class="body td-difference ${diffCls}">${diffTxt}</td>
      <td class="body td-time">${timeStr}</td>`;

    courseBody.appendChild(tr);
  }

  const loadRates = () =>
    fetch(API_URL)
      .then((r) => r.json())
      .then(({ data }) => {
        const timeStr = new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        });
        prevTime = timeStr;

        rateBody.innerHTML = "";
        salesBody.innerHTML = "";
        courseBody.innerHTML = "";

        Object.entries(data).forEach(([code, rate]) => {
          const diff =
            prevRates[code] === undefined ? null : rate - prevRates[code];
          prevRates[code] = rate;

          addCurrencyRow(code);
          addSaleRow(code, rate);
          addCourseRow(code, rate, diff, timeStr);
        });
      })
      .catch(console.error);

  loadRates();
  setInterval(loadRates, 30_000);

  function handleResponsiveSelect() {
    const container = document.querySelector(".courses");
    const existingSelect = document.querySelector(".mobile-mode-select");
    const mobile = window.innerWidth <= 1220;

    if (mobile && !existingSelect) {
      const tableMap = {
        sales: document.querySelector(".table-sales"),
        course: document.querySelector(".table-course"),
        converter: document.querySelector(".converter"),
      };

      const selector = document.createElement("select");
      selector.className = "mobile-mode-select";
      ["sales", "course", "converter"].forEach((key) => {
        const o = document.createElement("option");
        o.value = key;
        o.textContent =
          key === "sales"
            ? "Surrender / Buy"
            : key[0].toUpperCase() + key.slice(1);
        selector.appendChild(o);
      });

      const wrap = document.createElement("div");
      wrap.className = "mobile-mode-wrapper";
      wrap.appendChild(selector);

      const top = document.querySelector(".courses-top");
      container.insertBefore(wrap, top.nextSibling);

      const show = (key) => {
        Object.entries(tableMap).forEach(([k, el]) => {
          if (el) el.style.display = k === key ? "" : "none";
        });
      };
      selector.addEventListener("change", () => show(selector.value));
      show("sales");
    }

    if (!mobile && existingSelect) {
      existingSelect.parentElement.remove();
      document
        .querySelectorAll(".table-sales, .table-course, .converter")
        .forEach((el) => (el.style.display = ""));
    }
  }
  handleResponsiveSelect();
  window.addEventListener("resize", handleResponsiveSelect);
}
