const Button = (label = "Button", theme = "dark", disabled = false) => {
  const isRed = theme === "red";
  const themeClass = isRed ? "app-button__red" : "app-button__dark";
  const disabledAttr = disabled ? "disabled" : "";

  return `
    <button ${disabledAttr} class="app-button body ${themeClass}">
      ${label}
    </button>
  `;
};

export default Button;
