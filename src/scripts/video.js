import Button from "../components/Button.js";
let hasVideo = false;
const videos = [];
let current = 0;

const initVideoPage = () => {
  const trigger = document.getElementById("video-trigger");
  const input = document.getElementById("video-input");
  const header = document.querySelector(".white-container__header");
  const emptyBox = document.getElementById("video-empty");
  const container = document.querySelector(".video-container");

  if (!trigger || !input || !header) return;

  const openFileDialog = () => input.click();
  trigger.addEventListener("click", openFileDialog);

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    const overlay = createLoaderOverlay();
    emptyBox.appendChild(overlay);
    const reader = new FileReader();
    reader.onprogress = (e) => updateLoader(overlay, e);
    reader.onload = () => {
      overlay.remove();
      const videoURL = URL.createObjectURL(file);
      const preview = createPreview(videoURL);

      videos.push({ url: videoURL, duration: 0 });
      if (!hasVideo) {
        emptyBox.innerHTML = "";
        emptyBox.id = "video-list";
        emptyBox.className = "video-list";
        container.className = "video-wrapper";
        hasVideo = true;

        const btn = Button("Upload video file", "upload-btn-header");
        const btnNode = document
          .createRange()
          .createContextualFragment(btn).firstElementChild;
        header.appendChild(btnNode);
        btnNode.addEventListener("click", openFileDialog);
      }

      document.getElementById("video-list").appendChild(preview);

      preview.addEventListener("click", () => openPlayer(videos.length - 1));
    };

    reader.readAsArrayBuffer(file);
  });
};

function createPreview(url) {
  const wrap = document.createElement("div");
  wrap.className = "video-preview";

  const video = document.createElement("video");
  video.src = url;
  video.className = "video-thumb";
  video.muted = true;
  video.controls = false;

  const dur = document.createElement("span");
  dur.className = "video-duration";
  dur.innerHTML = `⏵ 00:00`;

  video.addEventListener("loadedmetadata", () => {
    const duration = formatDur(video.duration);
    dur.innerHTML = `⏵ ${duration}`;
  });

  wrap.append(video, dur);
  return wrap;
}

function formatDur(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  const h = Math.floor(m / 60);
  return h
    ? `${h.toString().padStart(2, "0")}:${(m % 60)
        .toString()
        .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    : `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function createLoaderOverlay() {
  const ov = document.createElement("div");
  ov.className = "loader-overlay";
  ov.innerHTML = `
      <span class="title1 title1-bold loader-text">Loading 0%</span>
      <div class="loader-bar"><div class="loader-bar__inner"></div></div>`;
  return ov;
}

function updateLoader(ov, e) {
  if (!e.lengthComputable) return;
  const pct = Math.round((e.loaded / e.total) * 100);
  ov.querySelector(".loader-text").textContent = `Loading ${pct}%`;
  ov.querySelector(".loader-bar__inner").style.width = `${pct}%`;
}

function openPlayer(index) {
  current = index;
  const ov = document.createElement("div");
  ov.className = "player-overlay";
  ov.innerHTML = `
    <div class="player-box">
      <button class="player-close">✕</button>
      <video class="player-main" controls></video>

      <button class="navigation left">‹</button>
      <button class="navigation right">›</button>

      <div class="thumbs" id="player-thumbs"></div>
    </div>`;
  document.body.appendChild(ov);

  ov.querySelector(".player-close").onclick = () => ov.remove();
  ov.querySelector(".navigation.left").onclick = () => swap(-1);
  ov.querySelector(".navigation.right").onclick = () => swap(1);

  buildThumbs();
  loadMain();
  disableScroll(true);

  ov.querySelector(".player-close").addEventListener("click", () => {
    disableScroll(false);
  });

  function swap(step) {
    current = (current + step + videos.length) % videos.length;
    loadMain();
    highlightThumb();
  }
  function loadMain() {
    ov.querySelector(".player-main").src = videos[current].url;
  }
  function buildThumbs() {
    const box = ov.querySelector("#player-thumbs");
    box.innerHTML = "";
    videos.forEach((v, i) => {
      const img = document.createElement("video");
      img.src = v.url;
      img.muted = true;
      img.className = "thumb" + (i === current ? " active" : "");
      img.onclick = () => {
        current = i;
        loadMain();
        highlightThumb();
      };
      box.appendChild(img);
    });
  }
  function highlightThumb() {
    ov.querySelectorAll(".thumb").forEach((t, i) =>
      t.classList.toggle("active", i === current),
    );
  }
}

function disableScroll(state) {
  document.body.style.overflow = state ? "hidden" : "";
}
export default initVideoPage;
