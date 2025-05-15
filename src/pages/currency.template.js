import WhiteContainer from "../components/Container.js";
import plusIcon from "!!raw-loader!../assets/icons/plus.svg";

const today = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const content = `
    <section class="currency-page">
      <div class="courses">
        <div class="courses-top">
          <h1 class="large-title-bold large-title currency-header">Exchange rates</h1>
          <p class="large-title-bold large-title date">${today}</p>
        </div>
        <div class="tables-titles">
        <span class="title2"></span>
        <span class="title2">Best courses</span>
        <span class="title2">Exchange</span>
</div>
        <div class="tables">
          <table class="rates-table">
            <thead>
              <tr>
                <th class="body head-table">Currency</th>
              </tr>
            </thead>
            <tbody id="rates-body"></tbody>
          </table>
          <table class="rates-table table-sales">
            <thead>
              <tr>
                <th class="body head-table">Surrender</th>
                <th class="body head-table">Buy</th>
              </tr>
            </thead>
            <tbody id="sales-body"></tbody>
          </table>
          <table class="rates-table table-course">
            <thead>
              <tr>
                <th class="body head-table">Course</th>
              </tr>
            </thead>
            <tbody id="course-body"></tbody>
          </table>
        </div>
      </div>
      <div class="converter">
        <h2 class="large-title large-title-bold">Currency Converter</h2>
        <div id="converter-list">
          <div class="converter-row">
            <div class="currency-title">
              <div class="flag-container flag-container-h40">
                <img src="https://flagcdn.com/w40/us.png"  alt=""/>
              </div>
              <span class="title1 title1-bold">USD</span>
            </div>
            <input
              class="body"
              type="number"
              value="1"
              id="base-input"
              readonly
            />
          </div>
          <div class="converter-row">
            <div class="currency-title">
              <div class="flag-container flag-container-h40">
                <img src="https://flagcdn.com/w40/us.png"  alt=""/>
              </div>
            </div>
            <input
              class="body"
              type="number"
              value="1"
              id="base-input"
              readonly
            />
          </div>
        </div>
        <button class="add-button">
          ${plusIcon}
          <select id="add-select" class="add-currency body"></select>
        </button>
      </div>
    </section>
`;

export default WhiteContainer("", content);
