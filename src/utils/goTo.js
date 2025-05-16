import { render } from "../router";

export function goTo(path) {
  window.history.pushState({}, "", path);
  render(path);
}
