import Input from "../components/Input.js";
import Button from "../components/Button.js";
import messageIcon from "!!raw-loader!../assets/icons/message.svg";
import securityIcon from "!!raw-loader!../assets/icons/security.svg";

const AuthPage = `
  <section class="auth">
    <div class="auth-content">
      <div>
      <h1 class="title1-bold auth-title">Log in</h1>
      <p class="body">Welcome Back</p>
      </div>
      <form class="auth-form">
        ${Input("text", "Email Address", messageIcon, "gray")}
        ${Input("password", "Password", securityIcon, "gray", "password1")}
        ${Button("Login")}
      </form>
    </div>
  </section>
`;

export default AuthPage;
