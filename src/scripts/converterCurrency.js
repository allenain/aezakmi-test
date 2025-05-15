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
      if (
        code === baseCurrency ||
        DISPLAY_CURRENCIES.includes(code) ||
        extraCurrencies.includes(code)
      )
        return;

      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = code;
      addSelect.appendChild(opt);
    });
  };

  const addRow = (code, value, isRemovable = false) => {
    const row = document.createElement("div");
    row.className = "converter-row";
    row.dataset.code = code;

    row.innerHTML = `
      <div class="currency-title">
        <div class="flag-container flag-container-h40">${getFlag(code)}</div>
        <span class="title1 title1-bold title-curr">${code}</span>
      </div>
      <input class="body" type="number" value="${value.toFixed(4)}" readonly />
      ${isRemovable ? '<button class="title1-bold remove-btn" title="Remove">✕</button>' : ""}
    `;

    if (isRemovable) {
      row.querySelector(".remove-btn").addEventListener("click", () => {
        extraCurrencies = extraCurrencies.filter((c) => c !== code);
        renderBlock();
      });
    }

    list.appendChild(row);
  };

  const renderBlock = () => {
    list.innerHTML = "";

    addRow(baseCurrency, 1);
    DISPLAY_CURRENCIES.filter((c) => c !== baseCurrency).forEach((code) =>
      addRow(code, memoryRates[code] || 0),
    );

    extraCurrencies.forEach((code) => {
      if (memoryRates[code]) addRow(code, memoryRates[code], true);
    });

    fillSelect();
  };

  const fetchRates = async (base) => {
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&base_currency=${base}`,
    );
    const json = await res.json();
    Object.assign(memoryRates, json.data);
  };

  await fetchRates(baseCurrency);
  renderBlock();

  addSelect.addEventListener("change", async (e) => {
    const newCode = e.target.value;
    if (!newCode || extraCurrencies.includes(newCode)) return;

    await fetchRates(baseCurrency);
    extraCurrencies.push(newCode);
    renderBlock();

    addSelect.selectedIndex = 0;
  });
}
