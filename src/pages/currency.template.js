import WhiteCard from "../components/Container.js";

const content = `
  <section class="currency-page">
    <div class="courses">
        <div class="courses-top">
             <h1 class="large-title-bold large-title">Exchange rates</h1>
             <p class="large-title-bold large-title date">March 31, 2025</p>
        </div>
         <table class="rates-table">
  <thead>
    <tr>
      <th class="body head-table">Currency</th>
    </tr>
  </thead>
  <tbody id="rates-body"></tbody>
</table>
    </div>
   
  </section>
`;

export default WhiteCard(content);
