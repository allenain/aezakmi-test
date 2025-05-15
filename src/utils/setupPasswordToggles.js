import eyeOpen from "!!raw-loader!../assets/icons/eye.svg";
import eyeClosed from "!!raw-loader!../assets/icons/eye_close.svg";

const setupPasswordToggles = () => {
  document
    .querySelectorAll(".input-wrapper input[type='password']")
    .forEach((input) => {
      const toggle = input.parentElement.querySelector(".toggle-password");
      const eyeIcon = toggle?.querySelector(".eye-icon");

      if (!toggle || !eyeIcon) return;

      eyeIcon.innerHTML = eyeOpen;

      input.addEventListener("input", () => {
        toggle.style.display = input.value ? "block" : "none";
      });

      toggle.addEventListener("click", () => {
        const isVisible = input.type === "text";
        input.type = isVisible ? "password" : "text";
        eyeIcon.innerHTML = isVisible ? eyeOpen : eyeClosed;
      });
    });
};

export default setupPasswordToggles;
