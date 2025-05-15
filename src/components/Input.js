const Input = (
  type = "text",
  placeholder = "",
  iconSvg = "",
  iconStyle = "",
  id = "",
) => {
  const isPassword = type === "password";

  return `
    <label class="input-wrapper">
      <span class="input-icon ${iconStyle}">${iconSvg}</span>
      <input
        type="${type}"
        placeholder="${placeholder}"
        class="input-field"
        id="${id}"
        autocomplete="off"
      />
      ${
        isPassword
          ? `<button type="button" class="toggle-password" data-for="${id}" style="display: none;">
              <span class="input-icon eye-icon eye-icon-show"></span>
            </button>`
          : ""
      }
    </label>
  `;
};

export default Input;
