const initTimer = () => {
  const selects = document.querySelectorAll(".time-select");
  const resetBtn = document.querySelector(".app-button--red");
  const startBtn = document.querySelector(
    ".timer-buttons .app-button:not(.app-button--red)",
  );
  const iconSvg = document.querySelector(".timer-icon svg");

  if (selects.length !== 3 || !resetBtn || !startBtn || !iconSvg) return;

  let totalSec = 0;
  let timerId = null;

  const pad = (n) => String(n).padStart(2, "0");
  const maxes = [23, 59, 59];

  selects.forEach((select, i) => {
    for (let n = 0; n <= maxes[i]; n++) {
      const opt = document.createElement("option");
      opt.value = n;
      opt.textContent = pad(n);
      select.appendChild(opt);
    }
    select.addEventListener("change", recalcTotal);
  });

  const toggleStart = (enable) => {
    startBtn.disabled = !enable;
    startBtn.classList.toggle("app-button--disabled", !enable);
    startBtn.style.cursor = enable ? "pointer" : "not-allowed";
  };

  function recalcTotal() {
    const [h, m, s] = Array.from(selects, (s) => +s.value);
    totalSec = h * 3600 + m * 60 + s;
    selects.forEach((sel) => {
      if (+sel.value > 0) sel.classList.add("has-value");
      else sel.classList.remove("has-value");
    });

    toggleStart(totalSec > 0);
  }

  function refresh() {
    selects[0].value = Math.floor(totalSec / 3600);
    selects[1].value = Math.floor((totalSec % 3600) / 60);
    selects[2].value = totalSec % 60;
  }

  function restartAnimation() {
    iconSvg.style.animation = "none";
    iconSvg.offsetHeight;
    iconSvg.style.animation =
      "hourglass-spin 1.5s cubic-bezier(.74,.02,.29,1) infinite";
    iconSvg.style.animationPlayState = "running";
  }

  function go() {
    if (totalSec <= 0) return;
    startBtn.textContent = "Pause";
    restartAnimation();
    timerId = setInterval(() => {
      totalSec--;
      refresh();
      if (totalSec <= 0) stop(true);
    }, 1000);
  }

  function stop(done = false) {
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = "Start";

    iconSvg.style.animation = "none";
    iconSvg.offsetHeight;
    iconSvg.style.transform = "rotate(0deg)";

    if (done) toggleStart(false);
  }

  startBtn.addEventListener("click", () => {
    if (startBtn.disabled) return;
    timerId ? stop() : go();
  });

  resetBtn.addEventListener("click", () => {
    stop();
    totalSec = 0;
    refresh();
    recalcTotal();
  });
  recalcTotal();

  iconSvg.style.animation =
    "hourglass-spin 1.5s cubic-bezier(.74,.02,.29,1) infinite";
  iconSvg.style.animationPlayState = "paused";
};

export default initTimer;
