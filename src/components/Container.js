const Container = (headerHtml = "", contentHtml = "") => {
  return `
    <div class="white-card">
      ${headerHtml ? `<div class="large-title large-title-bold white-card__header">${headerHtml}</div>` : ""}
      <div class="white-card__content">${contentHtml}</div>
    </div>
  `;
};

export default Container;
