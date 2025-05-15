const Container = (headerHtml = "", contentHtml = "") => {
  return `
    <div class="white-container">
      ${headerHtml ? `<div class="large-title large-title-bold white-container__header">${headerHtml}</div>` : ""}
      <div class="white-container__content">${contentHtml}</div>
    </div>
  `;
};

export default Container;
