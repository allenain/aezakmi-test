const Button = (label = "Button", theme = "dark") => {
  return `
    <button class="app-button ${theme === "red" ? "app-button--red" : "app-button--dark"}">
      ${label}
    </button>
  `;
};

export default Button;
