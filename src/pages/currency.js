const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";

const API_KEY = process.env.CURRENCY_KEY;

const API_URL = `${BASE_URL}?apikey=${API_KEY}&base_currency=USD`;

function getFlagSvg(iso) {
  return `<img src="https://flagcdn.com/w80/${iso.slice(0, 2).toLowerCase()}.png"
               alt="${iso} flag" class="flag" />`;
}

export default function initCurrencyPage() {
  const tbody = document.getElementById("rates-body");
  if (!tbody) return;
  const addRow = (code) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="cur-cell">
      <div class="flag-container">
      ${getFlagSvg(code)}
        </div>
         <span>${code}</span>
      </td>
    `;
    tbody.appendChild(tr);
  };

  const loadRates = () =>
    fetch(API_URL)
      .then((r) => r.json())
      .then(({ data }) => {
        tbody.innerHTML = "";
        Object.entries(data).forEach(([code]) => addRow(code));
      })
      .catch(console.error);

  loadRates();
  setInterval(loadRates, 30_000);
}
