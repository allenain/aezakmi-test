import { getFlag } from "../utils/getFlag";

const DISPLAY_CURRENCIES = ["USD", "EUR", "RUB"];
const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = process.env.CURRENCY_KEY;

const memoryRates = {};
let baseCurrency = "USD";
let extraCurrencies = [];

export default async function initConverter() {
  const list = document.getElementById("converter-list");
  const addSelect = document.getElementById("add-select");

  const fillSelect = () => {
    addSelect.innerHTML =
      '<option value="" disabled selected hidden>Add currency</option>';

    Object.keys(memoryRates).forEach((code) => {
      if (code === baseCurrency || extraCurrencies.includes(code)) return;
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = code;
      addSelect.appendChild(opt);
    });
  };

  function addRow(code, value) {
    const removable = !DISPLAY_CURRENCIES.includes(code);

    const row = document.createElement("div");
    row.className = "converter-row";
    row.dataset.code = code;
    row.innerHTML = `
      <div class="currency-title">
        <div class="flag-container flag-container-h40">${getFlag(code)}</div>
        <span class="title1 title1-bold title-cur">${code}</span>
      </div>
      <input class="body" type="number" value="${value.toFixed(4)}" readonly />
      ${removable ? '<button class="remove-btn" title="Remove">✕</button>' : ""}
    `;

    if (removable) {
      row.querySelector(".remove-btn").addEventListener("click", () => {
        if (code === baseCurrency) {
          baseCurrency = "USD";
        } else {
          extraCurrencies = extraCurrencies.filter((c) => c !== code);
        }
        renderBlock();
      });
    }
    list.appendChild(row);
  }

  function renderBlock() {
    list.innerHTML = "";

    addRow(baseCurrency, 1);

    DISPLAY_CURRENCIES.filter((c) => c !== baseCurrency).forEach((c) =>
      addRow(c, memoryRates[c] ?? 0),
    );

    extraCurrencies.forEach((c) => {
      if (memoryRates[c]) addRow(c, memoryRates[c]);
    });

    fillSelect();
  }

  async function fetchRates(base) {
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&base_currency=${base}`,
    );
    const data = (await res.json()).data;
    Object.assign(memoryRates, data);
  }

  await fetchRates(baseCurrency);
  renderBlock();

  addSelect.addEventListener("change", async (e) => {
    const newCode = e.target.value;
    if (!newCode) return;

    baseCurrency = newCode;
    extraCurrencies = [];
    await fetchRates(baseCurrency);
    renderBlock();
    addSelect.selectedIndex = 0;
  });
}
