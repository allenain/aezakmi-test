import WhiteContainer from "../components/Container.js";
import Button from "../components/Button.js";
import timerIcon from "!!raw-loader!../assets/icons/hourglass.svg";

const content = `
  <section class="title1-bold timer-container">
      <div class="timer-circle">
        <div class="timer-icon">${timerIcon}</div>
      </div>
      <div class="time-numbers">
        <div class="time-block">
          <label>
            <select class="time-select large-title-bold large-title"></select>
          </label>
          <span class="title3">Hours</span>
        </div>
        <div class="time-block">
          <label>
            <select class="time-select large-title-bold large-title"></select>
          </label>
          <span class="title3">Minutes</span>
        </div>
        <div class="time-block">
          <label>
            <select class="time-select large-title-bold large-title"></select>
          </label>
          <span class="title3">Seconds</span>
        </div>
      </div>
      <div class="timer-buttons">
        <div>${Button("Reset", "red")}</div>
        <div>${Button("Start", "", true)}</div>
      </div>
    </section>`;

export default WhiteContainer("Countdown timer", content);
